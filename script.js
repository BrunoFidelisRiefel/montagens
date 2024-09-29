let produtos = [];

function adicionarProduto() {
  const codigo = document.getElementById('codigoProduto').value;
  const descricao = document.getElementById('descricaoProduto').value;
  const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
  const valor = parseFloat(document.getElementById('valorProduto').value);

  if (!codigo || !descricao || !quantidade || !valor) {
    alert('Por favor, preencha todos os campos do produto.');
    return;
  }

  const subtotal = quantidade * valor;

  produtos.push({ codigo, descricao, quantidade, valor, subtotal });

  atualizarTabela();
  atualizarTotal();
  limparCamposProduto();
}

function atualizarTabela() {
  const tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
  tabela.innerHTML = '';

  produtos.forEach(produto => {
    const row = tabela.insertRow();
    row.insertCell(0).textContent = produto.codigo;
    row.insertCell(1).textContent = produto.descricao;
    row.insertCell(2).textContent = produto.quantidade;
    row.insertCell(3).textContent = `R$ ${produto.valor.toFixed(2)}`;
    row.insertCell(4).textContent = `R$ ${produto.subtotal.toFixed(2)}`;
  });
}

function atualizarTotal() {
  const total = produtos.reduce((soma, produto) => soma + produto.subtotal, 0);
  document.getElementById('valorTotal').textContent = total.toFixed(2);
}

function limparCamposProduto() {
  document.getElementById('codigoProduto').value = '';
  document.getElementById('descricaoProduto').value = '';
  document.getElementById('quantidadeProduto').value = '';
  document.getElementById('valorProduto').value = '';
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;
  const telefone = document.getElementById('telefone').value;
  const codigoCliente = document.getElementById('codigoCliente').value;
  const numeroNF = document.getElementById('numeroNF').value;
  const dataVenda = document.getElementById('dataVenda').value;
  const dataEntrega = document.getElementById('dataEntrega').value;

  let y = 10;
  doc.text(`Nome: ${nome}`, 10, y);
  doc.text(`Endereço: ${endereco}`, 10, y + 10);
  doc.text(`Telefone: ${telefone}`, 10, y + 20);
  doc.text(`Código do Cliente: ${codigoCliente}`, 10, y + 30);
  doc.text(`Número NF: ${numeroNF}`, 10, y + 40);
  doc.text(`Data da Venda: ${dataVenda}`, 10, y + 50);
  doc.text(`Data de Entrega: ${dataEntrega}`, 10, y + 60);

  y += 70;
  produtos.forEach((produto, index) => {
    doc.text(`Produto ${index + 1}: ${produto.descricao}`, 10, y);
    doc.text(`Quantidade: ${produto.quantidade}`, 10, y + 10);
    doc.text(`Valor Unitário: R$ ${produto.valor.toFixed(2)}`, 10, y + 20);
    doc.text(`Subtotal: R$ ${produto.subtotal.toFixed(2)}`, 10, y + 30);
    y += 40;
  });

  const total = produtos.reduce((soma, produto) => soma + produto.subtotal, 0);
  doc.text(`Valor Total: R$ ${total.toFixed(2)}`, 10, y + 10);

  doc.save('requisicao.pdf');
}
