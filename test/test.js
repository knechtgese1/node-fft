var assert = require('assert'),
    fft = require('../').fft,
    dft = require('../').dft;

describe('FFT (Cooley-Tukey)', function () {

    describe('1,0,1,0', function () {
        it('Should properly compute [1,0,1,0]', function () {
            var coef = fft([1,0,1,0]);
            checkShortVectorWithThresh(coef);
        });
    });

    describe('1,0,1,0,2,0,2,0', function () {
        it('Should properly compute [1,0,1,0,2,0,2,0]', function () {
            var coef = fft([1,0,1,0,2,0,2,0]);
            checkLongVectorWithThresh(coef);
        });
    });
});

describe('DFT O(n^2) Brute Force', function() {
   describe('1,0,1,0', function() {
      it('Should properly compute [1, 0, 1, 0]', function() {
          var coef = dft([1,0,1,0]);
          checkShortVectorWithThresh(coef);
      });
   });
});

describe('Compare FFT to DFT', function() {
    var randomSignal = signalVector();
    var coefFFT, coefDFT;

    describe('randomSignal FFT', function() {
        it ('Should compute randomSignal', function() {
            coefFFT = fft(randomSignal);
            assert(coefFFT && coefFFT.length == randomSignal.length);
        });
    });
    describe('randomSignal DFT', function() {
        it('Should compute randomSignal', function() {
            coefDFT = dft(randomSignal);
            assert(coefDFT && coefDFT.length == randomSignal.length);
        })
    });
    describe('randomSignal FFT and DFT', function() {
        it('Should compute same output', function() {

            //Loop over all elements in the two output arrays
            for (var i = 0; i < randomSignal.length; i++) {
                //Check that they are equal within reason
                assert(equalWithThresh(coefFFT[i][0], coefDFT[i][0], 0.01));
                assert(equalWithThresh(coefFFT[i][1], coefDFT[i][1], 0.01));
            }
        })
    });
});

function signalVector(vectorLength) {
  vectorLength = vectorLength || 16;
  var vector = [];

  for (var i = 0; i < vectorLength; i++) {
    vector[i] = Math.random();
  }

  return vector;
};

function checkShortVectorWithThresh(coef) {
    assert(equalWithThresh(coef[0][0], 2, 0.01));
    assert(equalWithThresh(coef[0][1], 0, 0.01));
    assert(equalWithThresh(coef[1][0], 0, 0.01));
    assert(equalWithThresh(coef[1][1], 0, 0.01));
    assert(equalWithThresh(coef[2][0], 2, 0.01));
    assert(equalWithThresh(coef[2][1], 0, 0.01));
    assert(equalWithThresh(coef[3][0], 0, 0.01));
    assert(equalWithThresh(coef[3][1], 0, 0.01));
}

function checkLongVectorWithThresh(coef) {
    assert(equalWithThresh(coef[0][0], 6, 0.01));
    assert(equalWithThresh(coef[0][1], 0, 0.01));
    assert(equalWithThresh(coef[1][0], -1, 0.01));
    assert(equalWithThresh(coef[1][1], 1, 0.01));
    assert(equalWithThresh(coef[2][0], 0, 0.01));
    assert(equalWithThresh(coef[2][1], 0, 0.01));
    assert(equalWithThresh(coef[3][0], -1, 0.01));
    assert(equalWithThresh(coef[3][1], -1, 0.01));
    assert(equalWithThresh(coef[4][0], 6, 0.01));
    assert(equalWithThresh(coef[4][1], 0, 0.01));
    assert(equalWithThresh(coef[5][0], -1, 0.01));
    assert(equalWithThresh(coef[5][1], 1, 0.01));
    assert(equalWithThresh(coef[6][0], 0, 0.01));
    assert(equalWithThresh(coef[6][1], 0, 0.01));
    assert(equalWithThresh(coef[7][0], -1, 0.01));
    assert(equalWithThresh(coef[7][1], -1, 0.01));
}

function equalWithThresh(val1, val2, threshold) {
    return (val1 > val2 - threshold) &&
           (val1 < val2 + threshold);
}
