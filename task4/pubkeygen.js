// Modified from https://www.bing.com/videos/search?q=javascript+prime+number+generator&&view=detail&mid=62DA6010979AC557931362DA6010979AC5579313&&FORM=VRDGAR
function get_primes(max) {
    let temp = new Array(max);

    // Remove even numbers
    temp[2] = 1;
    for (let i = 3; i < max; i+=2) {
        temp[i] = 1;
    }

    // Remove other non-prime numbers
    for (let i = 3; i < max; i += 2) {
        for (let j = 3; i*j < max; j+= 2) {
            temp[i*j] = 0;
        }
    }

    // Add prime elements onto array
    let prime_array = new Array();
    prime_array.push(2);
    for (let i = 3; i < max; i+=2) {
        if (temp[i]) {
            prime_array.push(i);
        }
    }

    return prime_array;
}

// function is_prime(n) {
//     for ( let i = 2; i < n; i++ ) {
//         if ( n % i === 0 ) {
//             return false;
//         }
//     }
//     return true;
// }

function random() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function getRandomInt(max) {
    return Math.floor(random() * Math.floor(max));
}

function gen_prime() { 
    // let p = getRandomInt(3678433195);
    // let q = getRandomInt(3678433195);
    // while (!is_prime(p)) {
    //     p = getRandomInt(3678433195);
    // }
    // while (!is_prime(q) || p == q) {
    //     q = getRandomInt(3678433195);
    // }

    let max = 100000;
    let prime_array = get_primes(max);

    let i = getRandomInt(prime_array.length);
    let j = getRandomInt(prime_array.length);
    while (i == j) {
        j = getRandomInt(prime_array.length);
    }
    let p = prime_array[i];
    let q = prime_array[j];

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