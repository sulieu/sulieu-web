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
    appLocalization: {
      i18n: {
        autoReload: true
      }
    },
    appTimeline: {
    }
  }
};
