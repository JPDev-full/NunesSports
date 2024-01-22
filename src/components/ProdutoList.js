// src/components/ProdutoList.js
import React from 'react';

const ProdutoList = ({ produtos, handleEditProduto, handleDeleteProduto, editingId }) => {
  return (
    <div>
      <h3>Produtos Cadastrados:</h3>
      {produtos.map((produto) => (
        <div className="item-box" key={produto.id}>
          <div>
            <strong>Nome:</strong> {produto.nome}
          </div>
          <div>
            <strong>Descrição:</strong> {produto.descricao}
          </div>
          <div>
            <strong>Preço:</strong> R$ {produto.preco}
          </div>
          <button onClick={() => handleEditProduto(produto.id)} disabled={editingId !== null}>
            Editar
          </button>
          <button onClick={() => handleDeleteProduto(produto.id)}>Excluir</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProdutoList;
