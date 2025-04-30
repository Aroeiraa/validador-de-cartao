function validateCreditCard(cardNumber) {

  const number = cardNumber.replace(/\D/g, '');
    
    if (!/^\d{13,19}$/.test(number)) {
        return {
            isValid: false,
            issuer: 'Invalid length'
        };      
        function validarCartaoCredito(cardNumber) {
            // Remove espaços e caracteres não numéricos
            const numeroLimpo = cardNumber.replace(/\D/g, '');
        
            // Verifica se o número tem entre 13 e 19 dígitos
            if (!/^\d{13,19}$/.test(numeroLimpo)) {
                return {
                    valido: false,
                    bandeira: 'Tamanho Inválido'
                };
            }
        
            // Identifica a bandeira do cartão
            let bandeira = '';
            if (numeroLimpo.startsWith('4')) {
                bandeira = 'Visa';
            } else if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(numeroLimpo)) {
                bandeira = 'MasterCard';
            } else if (/^(4011|4312|4389)/.test(numeroLimpo)) {
                bandeira = 'Elo';
            } else if (/^(34|37)/.test(numeroLimpo)) {
                bandeira = 'American Express';
            } else if (/^(6011|65|64[4-9])/.test(numeroLimpo)) {
                bandeira = 'Discover';
            } else if (numeroLimpo.startsWith('6062')) {
                bandeira = 'Hipercard';
            } else {
                bandeira = 'Desconhecida';
            }
        
            // Valida o número do cartão usando o Algoritmo de Luhn
            let soma = 0;
            let duplicar = false;
        
            for (let i = numeroLimpo.length - 1; i >= 0; i--) {
                let digito = parseInt(numeroLimpo[i]);
        
                if (duplicar) {
                    digito *= 2;
                    if (digito > 9) {
                        digito -= 9;
                    }
                }
        
                soma += digito;
                duplicar = !duplicar;
            }
        
            const valido = soma % 10 === 0;
        
            return {
                valido,
                bandeira
            };
        }
        
        // Exemplo de uso
        const cartoesTeste = [
            '4532123456789012',    // Visa
            '5412345678901234',    // MasterCard
            '401178901234567',     // Elo
            '341234567890123',     // American Express
            '6011123456789012',    // Discover
            '6062123456789012',    // Hipercard
            '1234567890123'        // Inválido
        ];
        
        cartoesTeste.forEach(cartao => {
            const resultado = validarCartaoCredito(cartao);
            console.log(`Cartão: ${cartao}`);
            console.log(`Válido: ${resultado.valido}`);
            console.log(`Bandeira: ${resultado.bandeira}`);
            console.log('-------------------');
        });
    }

    let issuer = '';
    if (number.startsWith('4')) {
        issuer = 'Visa';
    } else if (/^(51|52|53|54|55)/.test(number) || /^(2221|2222|2223|2224|2225|2226|2227|2228|2229|2720)/.test(number)) {
        issuer = 'MasterCard';
    } else if (/^(4011|4312|4389)/.test(number)) {
        issuer = 'Elo';
    } else if (/^(34|37)/.test(number)) {
        issuer = 'American Express';
    } else if (/^(6011|65|644|645|646|647|648|649)/.test(number)) {
        issuer = 'Discover';
    } else if (number.startsWith('6062')) {
        issuer = 'Hipercard';
    } else {
        issuer = 'Unknown';
    }

    // Luhn Algorithm validation
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return {
        isValid: sum % 10 === 0,
        issuer: issuer
    };
}

// Example usage:
const testCards = [
    '4532123456789012',    // Visa
    '5412345678901234',    // MasterCard
    '401178901234567',     // Elo
    '341234567890123',     // American Express
    '6011123456789012',    // Discover
    '6062123456789012'     // Hipercard
];

testCards.forEach(card => {
    const result = validateCreditCard(card);
    console.log(`Card: ${card}`);
    console.log(`Valid: ${result.isValid}`);
    console.log(`Issuer: ${result.issuer}`);
    console.log('-------------------');
});

document.getElementById('validateButton').addEventListener('click', () => {
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;
    const expiryDate = document.getElementById('expiryDate').value;

    const resultDiv = document.getElementById('result');

    if (!/^\d{3,4}$/.test(cvv)) {
        resultDiv.innerHTML = `CVV inválido!`;
        resultDiv.style.color = 'red';
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        resultDiv.innerHTML = `Data de validade inválida! Use o formato MM/AA.`;
        resultDiv.style.color = 'red';
        return;
    }

    const result = validateCreditCard(cardNumber);

    if (result.isValid) {
        resultDiv.innerHTML = `Cartão válido! Bandeira: ${result.issuer}`;
        resultDiv.style.color = 'green';
    } else {
        resultDiv.innerHTML = `Número inválido!`;
        resultDiv.style.color = 'red';
    }
});