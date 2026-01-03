const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// ================================
// 📦 DADOS (mock em memória)
// ================================

let restaurantes = [
  {
    id: 1,
    nome: 'Burguer House',
    tipo: 'Hamburgueria',
    avaliacao: 4.8,
    descricao: 'Os melhores hambúrgueres artesanais da cidade',
    capa: 'https://img.freepik.com/psd-premium/modelo-de-banner-para-postagem-de-capa-do-facebook-para-hamburguer-de-menu-de-restaurante-fast-food_123605-1020.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    nome: 'Pizza Italiana',
    tipo: 'Pizzaria',
    avaliacao: 4.6,
    descricao: 'Pizzas tradicionais feitas no forno a lenha',
    capa: 'https://img.freepik.com/vetores-premium/modelo-de-design-de-capa-de-pizza-e-restaurante-delicioso-para-negocios-de-restaurantes-e-entrega_1293774-98.jpg',
    createdAt: new Date().toISOString()
  }
]

let produtos = [
  // 🍔 BURGUER HOUSE (restauranteId: 1)
  {
    id: 101,
    restauranteId: 1,
    nome: 'Hambúrguer Clássico',
    descricao: 'Pão brioche, carne 180g e queijo',
    foto: 'https://cdn0.tudoreceitas.com/pt/posts/8/9/1/hamburguer_de_frango_empanado_11198_orig.jpg',
    preco: 29.9,
    porcao: '1 pessoa',
    ativo: true
  },
  {
    id: 102,
    restauranteId: 1,
    nome: 'Hambúrguer Bacon',
    descricao: 'Carne 180g, queijo e bacon crocante',
    foto: 'https://hotmart.s3.amazonaws.com/product_pictures/891344ef-ec6b-47b2-bbb7-eab864ddc98e/_20230314_155431_0000.png',
    preco: 34.9,
    porcao: '1 pessoa',
    ativo: true
  },

  // 🍕 PIZZA ITALIANA (restauranteId: 2)
  {
    id: 201,
    restauranteId: 2,
    nome: 'Pizza Calabresa',
    descricao: 'Calabresa artesanal com cebola',
    foto: 'https://thelionsroarmhsn.com/wp-content/uploads/2015/04/Pepperoni_1.jpg',
    preco: 49.9,
    porcao: '2 pessoas',
    ativo: true
  },
  {
    id: 202,
    restauranteId: 2,
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela e manjericão',
    foto: 'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg',
    preco: 46.9,
    porcao: '2 pessoas',
    ativo: true
  }
]


// ================================
// 🔹 ROTAS BASE
// ================================

app.get('/', (req, res) => {
  res.json({ mensagem: 'API profissional de restaurantes 🚀' })
})

// ================================
// 📦 RESTAURANTES
// ================================

// GET todos
app.get('/restaurantes', (req, res) => {
  res.json(restaurantes)
})

// GET por ID
app.get('/restaurantes/:id', (req, res) => {
  const restaurante = restaurantes.find(
    (r) => r.id === Number(req.params.id)
  )

  if (!restaurante) {
    return res.status(404).json({ mensagem: 'Restaurante não encontrado' })
  }

  res.json(restaurante)
})

// POST criar restaurante
app.post('/restaurantes', (req, res) => {
  const novoRestaurante = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  }

  restaurantes.push(novoRestaurante)
  res.status(201).json(novoRestaurante)
})

// PUT atualizar restaurante
app.put('/restaurantes/:id', (req, res) => {
  const id = Number(req.params.id)

  restaurantes = restaurantes.map((r) =>
    r.id === id ? { ...r, ...req.body } : r
  )

  res.json({ mensagem: 'Restaurante atualizado com sucesso' })
})

// DELETE restaurante
app.delete('/restaurantes/:id', (req, res) => {
  const id = Number(req.params.id)
  restaurantes = restaurantes.filter((r) => r.id !== id)

  res.json({ mensagem: 'Restaurante removido com sucesso' })
})

// ================================
// 🍔 PRODUTOS / PRATOS
// ================================

// GET todos produtos
app.get('/produtos', (req, res) => {
  const { restauranteId } = req.query

  if (restauranteId) {
    const filtrados = produtos.filter(
      (p) => p.restauranteId === Number(restauranteId)
    )
    return res.json(filtrados)
  }

  res.json(produtos)
})

// GET produto por ID
app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find((p) => p.id === Number(req.params.id))

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' })
  }

  res.json(produto)
})

// POST criar produto
app.post('/produtos', (req, res) => {
  const novoProduto = {
    id: Date.now(),
    ativo: true,
    ...req.body
  }

  produtos.push(novoProduto)
  res.status(201).json(novoProduto)
})

// PUT atualizar produto
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id)

  produtos = produtos.map((p) =>
    p.id === id ? { ...p, ...req.body } : p
  )

  res.json({ mensagem: 'Produto atualizado com sucesso' })
})

// DELETE produto
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id)
  produtos = produtos.filter((p) => p.id !== id)

  res.json({ mensagem: 'Produto removido com sucesso' })
})

// ================================
// 🚀 SERVER
// ================================

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`)
})




