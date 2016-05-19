module.exports = {
  bridges: {
    filestoreMongodbWrapper: {
      mongodb: {
        connection_options: {
          host: '127.0.0.1',
          port: '27017',
          name: 'suviet-timeline'
        }
      }
    },
    timelineMongooseWrapper: {
      mongoose: {
        connection_options: {
          host: '127.0.0.1',
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
          hostname: 'localhost',
          port: 7878,
          mongodb: {
            uri: 'mongodb://127.0.0.1:27017/suviet-skywall'
          },
        }
      }
    },
    appLocalization: {
      i18n: {
        autoReload: true
      }
    },
    appTimeline: {
    },
    appWebserver: {
      host: '0.0.0.0',
      port: 7878,
      session: {
        mongodb: {
          uri: 'mongodb://127.0.0.1:27017/suviet-session'
        }
      }
    }
  }
};
