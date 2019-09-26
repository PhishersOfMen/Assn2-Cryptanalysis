function is_prime(n) {
    for ( let i = 2; i < n; i++ ) {
        if ( n % i === 0 ) {
            return false;
        }
    }
    return true;
}

function random() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function getRandomInt(max) {
    return Math.floor(random() * Math.floor(max));
}

function gen_prime() { // TODO: Modify for efficiency ... Limited array of prime numbers, random value selected
    let p = getRandomInt(3678433195);
    let q = getRandomInt(3678433195);
    while (!is_prime(p)) {
        p = getRandomInt(3678433195);
    }
    while (!is_prime(q) || p != q) {
        q = getRandomInt(3678433195);
    }

    return {
        'p': p,
        'q': q,
    };

}

function modulus(prime) {
    return prime.p * prime.q;
}

function f_n(prime) {
    return (prime.p - 1) * (prime.q - 1);
}

function rel_prime() {

}

function display_key(pub_key) {
    document.getElementById("public").innerHTML = pub_key;
}

function gen_public_key() {
    let primes = gen_prime();
    console.log(primes);
}