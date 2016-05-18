module.exports = {
  bridges: {
    filestoreMongodbWrapper: {
      mongodb: {
        connection_options: {
          host: '172.31.46.40',
          port: '27017',
          name: 'suviet-timeline'
        }
      }
    },
    timelineMongooseWrapper: {
      mongoose: {
        connection_options: {
          host: '172.31.46.40',
          port: '27017',
          name: 'suviet-timeline'
        }
      }
    }
  },
  plugins: {
    appArmor: {
      activeEngine: 'skywall',
      engines: {
        skywall: {
          hostname: 'suviet.net',
          port: 7777,
          mongodb: {
            uri: 'mongodb://172.31.46.40:27017/suviet-skywall'
          },
        }
      }
    },
    appLocalization: {
      i18n: {
        autoReload: true
      }
    },
    appWebserver: {
      host: '0.0.0.0',
      port: 7777,
      session: {
        mongodb: {
          uri: 'mongodb://172.31.46.40:27017/suviet-skywall'
        }
      }
    }
  }
};
