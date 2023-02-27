const isDev = process.env.NODE_ENV === 'development'
const baseUrl = {
  dev: 'http://localhost:3001',
  pro: 'http://148.70.52.182:12005'
}
const publicPath = [/^\/public/, /^\/login/]
const wsconfig = {
  url: isDev ? '127.0.0.1' : '148.70.52.182',
  port: isDev ? '3002' : '3002'
}

export {
  baseUrl,
  publicPath,
  wsconfig
}
