// Aguarda o HTML carregar completamente antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {
    
    // Mapeando os elementos do HTML para o JavaScript
    const cards = document.querySelectorAll('.card');
    const elementTotalItems = document.getElementById('total-items');
    const elementTotalOriginal = document.getElementById('total-original');
    const elementTotalDiscount = document.getElementById('total-discount');
    const elementTotalCash = document.getElementById('total-cash');

    // Mapeamento com as 12 informações personalizadas para os alertas
    const informacoesProdutos = {
        1: "Processador Intel Core i5-13400F: 10 Cores (6 P-cores + 4 E-cores), 16 Threads, Cache 20MB, Turbo frequência até 4.6GHz. Ideal para jogos e multitarefa!",
        2: "Placa de Vídeo RTX 4060 Ti: Arquitetura Ada Lovelace, 8GB GDDR6, suporte a Ray Tracing de 3ª geração e DLSS 3.0 para ganho massivo de FPS.",
        3: "Memória RAM DDR4 FURY 16GB: Velocidade de 3200MHz, CL16, dissipador de perfil baixo em alumínio preto. Excelente estabilidade e overclock automático Intel XMP.",
        4: "SSD Kingston NV2 1TB: Interface NVMe PCIe 4.0 x4, velocidade de leitura de até 3500MB/s e gravação de até 2100MB/s. Inicialização do sistema em segundos!",
        5: "Fonte Corsair CV550: Potência de 550W, certificação 80 Plus Bronze garantindo eficiência energética superior a 85%, ventoinha silenciosa de 120mm.",
        6: "Water Cooler MasterLiquid 240mm: Duas ventoinhas de 120mm PWM, bomba de câmara dupla de terceira geração, iluminação RGB e dissipação térmica avançada.",
        7: "Gabinete Gamer ATX: Lateral e frente em vidro temperado de 4mm, espaço para até 6 ventoinhas de 120mm, excelente fluxo de ar e filtro anti-poeira magnético.",
        8: "Placa Mãe ASUS TUF Gaming B550M-Plus: Slot PCIe 4.0, VRM robusto com DrMOS, dissipadores térmicos integrados, Rede 2.5Gb, suporte para processadores AMD Ryzen AM4.",
        9: "Processador AMD Ryzen 7 5700X: 8 Cores, 16 Threads, clock base de 3.4GHz (Turbo até 4.6GHz), 32MB de cache L3. Arquitetura Zen 3 de alta eficiência.",
        10: "Processador: AMD Ryzen 7 5700X — 8 núcleos / 16 threads, Cooler: Water cooler 240mm TGT Spartel V2, Placa-mãe: B550M AM4 — compatível com Ryzen, Memória RAM: 16GB DDR4 3200MHz, SSD: NVMe 1TB, Placa de vídeo: Palit GeForce RTX 5060 8GB, Fonte: 600W 80 Plus Bronze, Gabinete: Mid Tower com vidro lateral, Ventoinhas extras: Kit com 3 fans RGB/Rainbow.",
        11: "Processador Intel Core i5-14400, 10-Core, 16-Threads, 3.5GHz (4.7GHz Turbo),Cooler Mancer Alten S, 120mm, Preto, MCR-ALTS-BK0, 1 x Placa Mae MSI Pro H610M-S DDR4, Memoria Mancer Astrion, 8GB (1x8GB), DDR4, 3200MHz, C19, Preto, SSD Mancer Reaper S, 480GB, 2.5, Sata III 6GB/s, Leitura 500MB/s, Gravacao 450MB/s, Fonte Mancer Thunder 400W, 80 Plus Bronze, MCR-THR400-BL01-OEM, Gabinete Gamer TGT Legion, Mini-Tower, Lateral de Vidro, Preto, TGT-LGN-BK REESUMA",
        12: "Processador AMD Ryzen 5 9600X, 6-Core, 12-Threads, 3.9GHz (5.4GHz Turbo), Cooler Mancer Alten S, 120mm, Preto, MCR-ALTS-BK0, Placa Mae Pichau A620M, DDR5, Socket AM5, M-ATX, PCH-A620M-AM5, Memoria Hubble, 16GB (1x16GB), DDR5, 5600MHz, C46, Preto, PCH-HBLE16DDR5-5600, SSD Mancer Reaper S, 480GB, 2.5, Sata III 6GB/s, Leitura 500MB/s, Gravacao 450MB/s, MCR-RPR480-OEM, Fonte TGT Enfield, 500W, ATX Bivolt, Preto, TGT-EFD-OEM, Gabinete TGT B130, Mini-Tower, Preto, TGT-B130-PR01"
    };

    // Função responsável por recalcular os valores baseados nos cards selecionados
    function calcularCarrinho() {
        let totalOriginal = 0;
        let quantidadeSelecionada = 0;

        cards.forEach(card => {
            // Verifica se o card atual possui a classe 'selected'
            if (card.classList.contains('selected')) {
                const preco = parseFloat(card.getAttribute('data-price'));
                totalOriginal += preco;
                quantidadeSelecionada++;
            }
        });

        // Aplicação do desconto de 15% à vista
        const valorDesconto = totalOriginal * 0.15;
        const totalComDesconto = totalOriginal - valorDesconto;

        // Injeta os valores calculados formatados de volta no HTML
        elementTotalItems.textContent = quantidadeSelecionada;
        elementTotalOriginal.textContent = formatarMoeda(totalOriginal);
        elementTotalDiscount.textContent = formatarMoeda(valorDesconto);
        elementTotalCash.textContent = formatarMoeda(totalComDesconto);
    }

    // Função para formatar números para o padrão de moeda brasileiro (R$)
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Adiciona escuta de cliques em todos os cards do grid
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Alterna a classe 'selected' no card clicado (adiciona se não tiver, remove se tiver)
            card.classList.toggle('selected');
            
            // Roda a função de cálculo atualizada
            calcularCarrinho();
        });
    });

    // Configuração dos botões "Mais Informações" para exibir os alertas específicos
    const botoesInfo = document.querySelectorAll('.btn-info');
    botoesInfo.forEach((botao, index) => {
        botao.addEventListener('click', (event) => {
            // stopPropagation evita que o clique no botão ative o clique do Card pai
            event.stopPropagation(); 
            
            // Descobre o número do produto (de 1 a 12) baseado no índice do loop
            const numeroProduto = index + 1;
            
            // Pega o texto correspondente do nosso mapeamento
            const mensagem = informacoesProdutos[numeroProduto] || "Informações sobre o produto indisponíveis no momento.";
            
            // Exibe o alerta customizado
            alert(mensagem);
        });
    });

/* ================= AÇÃO DO BOTÃO COMPRAR ================= */
    const botaoComprar = document.getElementById('btn-finalizar-compra');
    
    botaoComprar.addEventListener('click', () => {
        // Pega os valores atuais diretamente do HTML da barra de resumo
        const quantidade = elementTotalItems.textContent;
        const valorOriginal = elementTotalOriginal.textContent; // Valor sem desconto
        const valorFinal = elementTotalCash.textContent;       // Valor com desconto
        
        // Converte a quantidade para número para fazer a validação se há itens selecionados
        if (parseInt(quantidade) === 0) {
            alert("Seu carrinho está vazio! Selecione pelo menos um produto clicando nos cards antes de finalizar a compra.");
        } else {
            // Exibe o alerta com o resumo contendo ambos os valores
            alert(
                `🛒 COMPRA INICIADA COM SUCESSO!\n\n` +
                `📦 Total de itens: ${quantidade} produto(s)\n` +
                `----------------------------------------\n` +
                `💵 Preço original (Total): ${valorOriginal}\n` +
                `🏷️ Preço com desconto (15% no PIX): ${valorFinal}\n\n` +
                `Obrigado por comprar na PrimeChip!`
            );
        }
    });
});

    