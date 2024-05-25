enum vehicle {
    ONIBUS = "ônibus",
    AVIAO = "Avião",
}

interface CaminhoViaOnibus {
    tipo: vehicle.ONIBUS;
    distancia: number;
    precoPorKm: number;
}

interface CaminhoViaAviao {
    tipo: vehicle.AVIAO;
    distancia: number;
    precoBase: number;
    precoPorKmExtra: number;
}

type Caminho = CaminhoViaOnibus | CaminhoViaAviao;

abstract class Calculadora {
    abstract calcularPreco(caminhos: Caminho[]): number;
}

class CalculadoraViagem extends Calculadora {
    public calcularPreco(caminhos: Caminho[]): number{
        let precoTotal = 0;
        caminhos.forEach((caminho) => {
            if (caminho.tipo === vehicle.ONIBUS){
                const result = caminho.distancia * caminho.precoPorKm;
                precoTotal += result;
                console.log(`Ônibus: ${result}`);
                
            } else if (caminho.tipo === vehicle.AVIAO){
                const result = caminho.distancia + caminho.precoBase * caminho.precoPorKmExtra;
                precoTotal += result;
                console.log(`Avião: ${result}`);
            }
        })

        return precoTotal;
    }
}

let caminhos: Caminho[] = [
    { tipo: vehicle.ONIBUS, distancia: 750, precoPorKm: 0.5 },
    { tipo: vehicle.AVIAO, distancia: 600, precoBase: 200, precoPorKmExtra: 0.2 },
    { tipo: vehicle.ONIBUS, distancia: 275, precoPorKm: 0.6 },
    { tipo: vehicle.AVIAO, distancia: 3000, precoBase: 150, precoPorKmExtra: 0.3 },
]

const calculadoraViagem = new CalculadoraViagem();

const precoTotalViagem = calculadoraViagem.calcularPreco(caminhos);

console.log(`O preço total da viagem é de : R$${precoTotalViagem.toFixed(2)}`);