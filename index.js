const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

// 🔹 Servir imagens
app.use('/imagens', express.static(path.join(__dirname, 'uploads')))

// 🔹 Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de restaurantes rodando 🚀'
  })
})

// 🔹 Dados das lojas (fonte única)
const lojas = [
  {
    id: 1,
    titulo: 'Burguer House',
    destacado: true,
    tipo: 'Hamburgueria',
    avaliacao: '4.8',
    descricao: 'Os melhores hambúrgueres artesanais da cidade',
    capa:
      'https://img.freepik.com/psd-premium/modelo-de-banner-para-postagem-de-capa-do-facebook-para-hamburguer-de-menu-de-restaurante-fast-food_123605-1020.jpg',
    cardapio: [
      {
        id: 1,
        nome: 'Hambúrguer Clássico',
        descricao: 'Pão brioche, carne 180g e queijo',
        foto:
          'https://cdn0.tudoreceitas.com/pt/posts/8/9/1/hamburguer_de_frango_empanado_11198_orig.jpg',
        preco: '29,90',
        porcao: '1 pessoa'
      },
      {
        id: 2,
        nome: 'Hambúrguer Bacon',
        descricao: 'Carne 180g, queijo e bacon crocante',
        foto:
          'https://hotmart.s3.amazonaws.com/product_pictures/891344ef-ec6b-47b2-bbb7-eab864ddc98e/_20230314_155431_0000.png',
        preco: '34,90',
        porcao: '1 pessoa'
      }
    ]
  },
  {
    id: 2,
    titulo: 'Pizza Italiana',
    tipo: 'Pizzaria',
    avaliacao: '4.6',
    descricao: 'Pizzas tradicionais feitas no forno a lenha',
    capa:
      'https://img.freepik.com/vetores-premium/modelo-de-design-de-capa-de-pizza-e-restaurante-delicioso-para-negocios-de-restaurantes-e-entrega_1293774-98.jpg',
    cardapio: [
      {
        id: 1,
        nome: 'Pizza Calabresa',
        descricao: 'Calabresa artesanal com cebola',
        foto:
          'https://thelionsroarmhsn.com/wp-content/uploads/2015/04/Pepperoni_1.jpg',
        preco: '49,90',
        porcao: '2 pessoas'
      },
      {
        id: 2,
        nome: 'Pizza Margherita',
        descricao: 'Molho de tomate, mussarela e manjericão',
        foto:
          'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg',
        preco: '46,90',
        porcao: '2 pessoas'
      }
    ]
  }
]

// 🔹 Rota de lojas (todas)
app.get('/lojas', (req, res) => {
  res.json(lojas)
})

// 🔹 Rota de loja por ID (ESSA RESOLVE SEU PROBLEMA)
app.get('/lojas/:id', (req, res) => {
  const { id } = req.params

  const loja = lojas.find((l) => l.id === Number(id))

  if (!loja) {
    return res.status(404).json({ mensagem: 'Loja não encontrada' })
  }

  res.json(loja)
})

// ✅ PORTA DINÂMICA
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`✅ API rodando na porta ${PORT}`)
})


