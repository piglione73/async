QUnit.test("Async.Value Init", function (assert) {
    var x = new Async.Value();
    assert.strictEqual(x.hasValue, false);
    assert.strictEqual(x.value, undefined);
    assert.strictEqual(x.callbacks.length, 0);
});

QUnit.test("Async.Value synchronous", function (assert) {
    var x = new Async.Value();

    var n = 0;
    x.setValue(57);
    assert.strictEqual(x.hasValue, true);
    assert.strictEqual(x.value, 57);
    assert.strictEqual(n, 0);
    assert.strictEqual(x.callbacks.length, 0);

    x.then(function (value) {
        n++;
        assert.strictEqual(value, 57);
    });

    x.then(function (value) {
        n++;
    });

    assert.strictEqual(n, 2);
    assert.strictEqual(x.callbacks.length, 0);
});

QUnit.test("Async.Value synchronous", function (assert) {
    var x = new Async.Value();

    var n = 0;
    x.then(function (value) {
        n++;
        assert.strictEqual(value, 57);
    });

    x.then(function (value) {
        n++;
    });


    assert.strictEqual(x.callbacks.length, 2);
    assert.strictEqual(x.hasValue, false);
    assert.strictEqual(x.value, undefined);
    assert.strictEqual(n, 0);

    x.setValue(57);

    assert.strictEqual(x.callbacks.length, 0);
    assert.strictEqual(x.hasValue, true);
    assert.strictEqual(x.value, 57);
    assert.strictEqual(n, 2);
});

QUnit.asyncTest("addAsync", function (assert) {
    var c = addAsync(1, 3, 5000);
    var d = addAsync(10, 30, 1000);
    var e = addAsync(d, c, 3000);
    var f = addAsync(c, 1, 100);

    Async.call(test, null, [c, d, e, f]);

    function test(c, d, e, f) {
        assert.equal(c, 4);
        assert.equal(d, 40);
        assert.equal(e, 44);
        assert.equal(f, 5);
        QUnit.start();
    }

    function addAsync(a, b, time) {
        console.log("addAsync(" + a + ", " + b + ", " + time + ")");
        var ret = new Async.Value();
        Async.call(run, this, arguments);
        return ret;

        function run(a, b, time) {
            setTimeout(function () {
                var c = a + b;
                ret.setValue(c);
                console.log("addAsync(" + a + ", " + b + ") returned " + c);
            }, time);
        }
    }
});
