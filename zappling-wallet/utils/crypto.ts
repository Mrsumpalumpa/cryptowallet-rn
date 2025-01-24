const crypto = require('crypto');
const RIPEMD160 = require('ripemd160');
const BS58 = require('bs58');

export const sha256 = (input:string) => crypto.createHash('sha256').update(input).digest();
export const ripemd160 = (input:string) => new RIPEMD160().update(input).digest();
export const bs58 = (input:string) => BS58.encode(input);

const generateECPoints = (privateKey:string) => {

    const Pcurve = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');

    const Gx = BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240');
    const Gy = BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424');

    const G = [Gx, Gy];

    const modInverse = (a:any, n:number) => {

        a = (a % n + n) % n

        const dArray = [];
        let b = n;

        while(b) {
        [a, b] = [b, a % b];
        dArray.push({a, b});
        }

        if (a !== BigInt(1)) {
        return null;
        }

        let x = BigInt(1);
        let y = BigInt(0);

        for(let i = dArray.length - 2; i >= 0; --i) {
        [x, y] = [y,  x - y * BigInt(dArray[i].a / dArray[i].b)];
        }

        return (y % n + n) % n;
    }

    const modOf = (a:number,b:number) => {
        const r = ((a % b) + b)% b;
        return r;
    }

    const ECAdd = (a:any[],b:any[]) => {
        const lamAdd = modOf((b[1] - a[1]) * BigInt(modInverse(b[0] - a[0], Pcurve)), Pcurve);
        const x = modOf((lamAdd*lamAdd - a[0] - b[0]), Pcurve);
        const y = modOf((lamAdd*(a[0] - x) - a[1]), Pcurve);
        return [x, y];
    }

    const ECDouble = a => {
        const lamda = modOf(((BigInt(3)*a[0]*a[0])*(modInverse(BigInt(2)*a[1], Pcurve))), Pcurve);
        const x = modOf((lamda*lamda - BigInt(2)*a[0]), Pcurve);
        const y = modOf((lamda*(a[0] - x) - a[1]), Pcurve);
        return [x, y];
    };

    const ECMultiply = (genPoint, pvtKey) => {
        const scalarBinary = BigInt('0x'+pvtKey).toString(2);
        let GP = genPoint;

        for (let i=1; i < scalarBinary.length; i++) {
            GP = ECDouble(GP)
            if (scalarBinary[i] === '1') {
                GP = ECAdd(GP, genPoint);
            }
        }
        return GP;
    }
   
    return ECMultiply(G, privateKey);
}