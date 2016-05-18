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
      activeEngine: 'skygate',
      engines: {
        skygate: {
          hostname: 'localhost',
          port: 7979,
          mongodb: {
            uri: 'mongodb://127.0.0.1:27017/suviet-skygate'
          },
        }
      }
    },
    appLocalization: {
      i18n: {
        autoReload: true
      }
    }
  }
};
