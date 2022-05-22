const fs = require('fs');
const path = require('path');
/* Reading the productsDataBase.json file and storing it in the products variable. */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const readBooks = () => {
   
    const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8'));
    return products
}
const saveBooks = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products,null,3));

const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports={
   


    detail: (req,res)=>{
       

        const product = readBooks().find(product=> product.id === +req.params.id);
        return res.render('productDetail',{
            product,
            toThousand
        })
    }, 
    
    create:(req,res)=>{
        return  res.render('productCreate')
    },

    store :(req,res)=>{

        let products = readBooks()

        const {name,autor,price,description,publisher,genre,language,category}=req.body;
        
        let newBook = {
            id: products[products.length - 1].id + 1, //obtengo el ultimo id y le sumo uno.
            name : name.trim(),
            autor: autor.trim(),
            price: +price,
            description: description.trim(),
            publisher: publisher.trim(),
            genre: genre,
            language: language,
            image: "default.png",
            category:category

        }

        products.push(newBook); 
        saveBooks(products)
        return res.redirect('/')
    },

    edit: (req,res)=>{
        let products = readBooks();
       let product = products.find(product => product.id === +req.params.id)
       return res.render('productEdit',{
         product

       })
    },

    update: (req,res)=>{

        let products = readBooks();
        const {name,autor,price,description,publisher,genre,language,image,category}=req.body;
         let booksModified = products.map(product => {
            if(product.id === +req.params.id){
               let bookModified ={
                   ...product,
                   name: name.trim(),
                   autor: autor.trim(),
                   price : +price,
                   description :description.trim(),
                   publisher: publisher,
                   genre :genre,
                   language:language,
                   image:"default.png",
                   category:category
               }
               return bookModified
            }
            return product
        })
        saveBooks(booksModified)
        return res.redirect('/')
    },

    destroy : (req,res)=>{


    },
    
    cart: (req,res)=>{
        return res.render('productCart')
    },

}
