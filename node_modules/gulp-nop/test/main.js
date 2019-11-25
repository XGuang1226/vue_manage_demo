var nop = require('../');
var should = require('should');
var path = require('path');
var File = require('gulp-util').File;
var Buffer = require('buffer').Buffer;
var fs = require('fs');
require('mocha');


describe('gulp-nop', function() {
    describe('nop()', function() {
        var files = ['test/file1.txt', 'test/file2.txt'],
            results = ['test/file1.txt', 'file1txt',
                       'test/file2.txt', 'file2txt'];

        var stream = nop();

        it('should do nothing', function(done) {
            stream.on('data', function (file) {
                var expectedFilename = results.shift(),
                    expectedHead = results.shift();

                should.exist(file);
                should.exist(file.relative);
                should.exist(file.contents);
                should.exist(expectedFilename);
                should.exist(expectedHead);

                var retFilename = path.resolve(file.path);
                retFilename.should.equal(path.resolve(expectedFilename));
                file.relative.should.equal(expectedFilename);

                Buffer.isBuffer(file.contents).should.equal(true);
                file.contents.toString().substring(0, expectedHead.length).should.equal(expectedHead);

                if (results && !results.length) {
                    results = null;
                    done();
                }
            });

            files.forEach(function (filename) {
                filename = path.resolve(filename);
                stream.write(new File({
                    path: filename,
                    contents: fs.readFileSync(filename)
                }));
            });

            stream.end();

            if (results && !results.length) {
                results = null;
                done();
            }
        });
    });
});
