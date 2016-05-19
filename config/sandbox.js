module.exports = {
  plugins: {
  	appArmor: {
      activeEngine: 'skywall',
      engines: {
        skywall: {
          hostname: 'localhost',
          port: 7979,
          mongodb: {
            uri: 'mongodb://localhost:27017/suviet-skywall'
          },
          companyName: process.env.COMPANY_NAME || 'suviet.net',
          projectName: process.env.PROJECT_NAME || 'suviet.net',
          systemEmail: 'contact@suviet.net',
          smtp: {
            from: {
              name: process.env.SMTP_FROM_NAME || 'Devebot Project',
              address: process.env.SMTP_FROM_ADDRESS || 'contact@devebot.com'
            },
            credentials: {
              user: process.env.SMTP_USERNAME || 'noreply@devebot.com',
              password: process.env.SMTP_PASSWORD || 'zaq123edcx',
              host: process.env.SMTP_HOST || 'smtp.gmail.com',
              ssl: true
            }
          },
          oauth: {
            twitter: {
              key: process.env.TWITTER_OAUTH_KEY || '',
              secret: process.env.TWITTER_OAUTH_SECRET || ''
            },
            facebook: {
              key: process.env.FACEBOOK_OAUTH_KEY || '',
              secret: process.env.FACEBOOK_OAUTH_SECRET || ''
            },
            github: {
              key: process.env.GITHUB_OAUTH_KEY || '',
              secret: process.env.GITHUB_OAUTH_SECRET || ''
            },
            google: {
              key: process.env.GOOGLE_OAUTH_KEY || '',
              secret: process.env.GOOGLE_OAUTH_SECRET || ''
            },
            tumblr: {
              key: process.env.TUMBLR_OAUTH_KEY || '',
              secret: process.env.TUMBLR_OAUTH_SECRET || ''
            }
          }
        }
      }
    },
    appDataboard: {
      contextPath: '/databoard',
      default: "ng-admin",
      client: {
        "ng-admin": {
          homedir: "public/client/ng-admin-mock",
          templateFile: __dirname + '/../templates/ng-admin/config.tmpl.js'
        }
      }
    },
    appFilestore: {
      contextPath: '/filestore',
      uploadDir: __dirname + '/../data/filestore/origin',
      thumbnailDir: __dirname + '/../data/filestore/tmp'
    },
    appLocalization: {
      i18n: {
        directory: __dirname + '/../locales'
      }
    },
    appTimeline: {
      contextPath: '/dong-thoi-gian',
      resources: {
        period: {
          slug: {
            listpage: 'thoi-ky-lich-su',
            itempage: 'thoi-ky'
          }
        },
        fact: {
          slug: {
            listpage: 'su-kien-lich-su',
            itempage: 'su-kien'
          }
        },
        figure: {
          slug: {
            listpage: 'nhan-vat-lich-su',
            itempage: 'nhan-vat'
          }
        },
        otherinfo: {
          slug: 'thong-tin-khac'
        }
      }
    },
    appWebserver: {
      host: '0.0.0.0',
      port: 7979,
      session: {
        name: 'sessionId',
        secret: 'd0bi3td4y',
        mongodb: {
          uri: 'mongodb://localhost:27017/suviet-skywall'
        }
      }
    }
  }
};
