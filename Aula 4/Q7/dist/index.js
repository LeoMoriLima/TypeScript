"use strict";
var vehicle;
(function (vehicle) {
    vehicle["ONIBUS"] = "\u00F4nibus";
    vehicle["AVIAO"] = "Avi\u00E3o";
})(vehicle || (vehicle = {}));
class Calculadora {
}
class CalculadoraViagem extends Calculadora {
    calcularPreco(caminhos) {
        let precoTotal = 0;
        caminhos.forEach((caminho) => {
            if (caminho.tipo === vehicle.ONIBUS) {
                const result = caminho.distancia * caminho.precoPorKm;
                precoTotal += result;
                console.log(`Ônibus: ${result}`);
            }
            else if (caminho.tipo === vehicle.AVIAO) {
                const result = caminho.distancia + caminho.precoBase * caminho.precoPorKmExtra;
                precoTotal += result;
                console.log(`Avião: ${result}`);
            }
        });
        return precoTotal;
    }
}
let caminhos = [
    { tipo: vehicle.ONIBUS, distancia: 750, precoPorKm: 0.5 },
    { tipo: vehicle.AVIAO, distancia: 600, precoBase: 200, precoPorKmExtra: 0.2 },
    { tipo: vehicle.ONIBUS, distancia: 275, precoPorKm: 0.6 },
    { tipo: vehicle.AVIAO, distancia: 3000, precoBase: 150, precoPorKmExtra: 0.3 },
];
const calculadoraViagem = new CalculadoraViagem();
const precoTotalViagem = calculadoraViagem.calcularPreco(caminhos);
console.log(`O preço total da viagem é de : R$${precoTotalViagem.toFixed(2)}`);
