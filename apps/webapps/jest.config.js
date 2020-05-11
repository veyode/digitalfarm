module.exports = {
  name: 'webapps',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/webapps',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
