module.exports = {
  bridges: {
    filestoreMongodbWrapper: {
      mongodb: {
        connection_options: {
          host: '172.31.34.60',
          port: '27017',
          name: 'suviet-timeline'
        }
      }
    },
    timelineMongooseWrapper: {
      mongoose: {
        connection_options: {
          host: '172.31.34.60',
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
            uri: 'mongodb://172.31.34.60:27017/suviet-skywall'
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
          uri: 'mongodb://172.31.34.60:27017/suviet-session'
        }
      }
    }
  }
};
