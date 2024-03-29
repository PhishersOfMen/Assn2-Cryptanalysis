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
    let primeArray = new Array();
    primeArray.push(2);
    for (let i = 3; i < max; i+=2) {
        if (temp[i]) {
            primeArray.push(i);
        }
    }

    return primeArray;
}

function random() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function getRandomInt(max) {
    return Math.floor(random() * Math.floor(max));
}

function gen_prime() { 
    let max = 100;
    let primeArray = get_primes(max);

    let i = getRandomInt(primeArray.length);
    let j = getRandomInt(primeArray.length);
    while (i == j) {
        j = getRandomInt(primeArray.length);
    }
    while (i*j < 128) {
        i = getRandomInt(primeArray.length);
        j = getRandomInt(primeArray.length);
        while (i == j) {
            j = getRandomInt(primeArray.length);
        }
    }
    let p = primeArray[i];
    let q = primeArray[j];

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

function rel_prime(fn) {
    let temp = new Array(fn);

    if (fn % 2 == 0) {
        for (let i = 3; i < fn; i+=2){
            if (fn % i != 0) {
                temp[i] = 1;
            }
            else {
                temp[i] = 0;
            }
        }
    }
    else {
        temp[2] = 1;
        for (let i = 3; i < fn; i++) {
            if (fn % i != 0) {
                temp[i] = 1;
            }
            else {
                temp[i] = 0;
            }
        }
    }

    let relPrimes = new Array();
    relPrimes.push(1);
    if (fn % 2 == 0) {
        relPrimes.push(2);
        for (let i = 3; i < fn; i+=2) {
            if (temp[i]) {
                relPrimes.push(i);
            }
        }
    }
    else {
        for (let i = 3; i < fn; i++) {
            if (temp[i]) {
                relPrimes.push(i);
            }
        }
    }

    return relPrimes[getRandomInt(relPrimes.length)];
}

function display_key(id, key) {
    document.getElementById(id).value = key;
}

function gen_public_key() {
    let primes = gen_prime();
    let m = modulus(primes);
    let fn = f_n(primes);
    let relPrime = rel_prime(fn);

    let key = [relPrime,m];

    display_key("public", key);
    saveKey("public");
    return [...key, fn];
}

function modInverse([pubKey, m, fn]) {
    pubKey = pubKey % fn;
    for (let i = 1; i < fn; ++i) {
        if ((i * pubKey) % fn == 1) {
            return [i,m];
        }
    }
    return 0;
}

function gen_private_key(pubKey) {
    let key = 0;
    while (!key) {
        key = modInverse(pubKey);
        if (key) {
            if (key[0] == pubKey[0]) {
                key = 0;
            } else {
                break;
            }
        } 
        pubKey = gen_public_key();
    }
    
    display_key("private", key);
    saveKey("private");
}

function getTextURL(text) {
    return URL.createObjectURL(new Blob([text], {type: "text/plain"}));
}

function saveKey(id) {
    let key = document.getElementById(id).value;
    let button = document.getElementById(`save-${id}`);

    if (button.href)

    if (key) {
        let url = getTextURL(key);
        button.classList.remove("disabled");
        button.href = url;
        button.setAttribute("download", `${id}.key`);
    }
}