QUnit.test("hello test", function (assert) {
    assert.ok(1 == "1", "Passed!");
});

/*
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

function fact(n) {
    console.log("fact(" + n + ")");
    var ret = new Async.Value();
    Async.call(run, this, arguments);
    return ret;

    function run(n) {
        setTimeout(function () {
            if (n <= 1) {
                console.log("fact(" + n + ") =  1");
                ret.setValue(1);
            }
            else {
                fact(n - 1).then(function (value) {
                    setTimeout(function () {
                        var product = n * value;
                        console.log("fact(" + n + ") =  " + product);
                        ret.setValue(product);
                    }, 500);
                });
            }
        }, 500);
    }
}

function fact2(n) {
    console.log("fact2(" + n + ")");
    var ret = new Async.Value();
    Async.call(run, this, arguments);
    return ret;

    function run(n) {
        if (n <= 1) {
            console.log("fact2(" + n + ") =  1");
            ret.setValue(1);
        }
        else {
            fact2(n - 1).then(function (value) {
                var product = n * value;
                console.log("fact2(" + n + ") =  " + product);
                ret.setValue(product);
            });
        }
    }
}

console.log("Start");
var c = addAsync(1, 3, 5000);
var d = addAsync(10, 30, 1000);
var e = addAsync(d, c, 3000);
var f = addAsync(c, 1, 100);
var x = fact(20);
var y = fact2(20);
console.log("End");

c.then(function (value) {
    console.log("c = " + value);
});
d.then(function (value) {
    console.log("d = " + value);
});
e.then(function (value) {
    console.log("e = " + value);
});
f.then(function (value) {
    console.log("f = " + value);
});
x.then(function (value) {
    console.log("x = " + value);
});
y.then(function (value) {
    console.log("y = " + value);

    y.then(function (value) {
        console.log("y = " + value);
    });
});
*/
