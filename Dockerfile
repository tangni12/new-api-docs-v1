# ApiFlow 文档站 Dockerfile
# 构建阶段使用 Bun 安装依赖，运行阶段只保留 Next.js standalone 产物。
FROM oven/bun:1 AS deps

WORKDIR /app

# 先复制依赖清单，利用 Docker 缓存减少重复安装时间。
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM node:22-bookworm-slim AS builder

WORKDIR /app

# 复用 Bun 安装出来的 node_modules，用 Node 执行 Next.js 生产构建。
COPY --from=deps /app/node_modules ./node_modules

# 再复制项目源码并构建生产产物。
COPY . .

# API_BASE_URL 用于服务端 OpenAPI 配置。
# NEXT_PUBLIC_API_BASE_URL 用于可能被前端打包读取的公开配置。
ARG API_BASE_URL=https://api.apiflow-ai.com
ARG NEXT_PUBLIC_API_BASE_URL=https://api.apiflow-ai.com
ARG NEXT_PUBLIC_BASE_PATH=/docs
ENV API_BASE_URL=${API_BASE_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}

# 先生成 Fumadocs 需要的 .source 文件，再执行 Next 构建。
RUN ./node_modules/.bin/fumadocs-mdx
RUN ./node_modules/.bin/next build --webpack

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV API_BASE_URL=https://api.apiflow-ai.com
ENV NEXT_PUBLIC_API_BASE_URL=https://api.apiflow-ai.com
ENV NEXT_PUBLIC_BASE_PATH=/docs

# Next standalone 产物中包含生产运行所需的 server.js 与必要依赖。
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
