const Material = require('../models/material')
const Record = require('../models/record')
const tryCatch = require('../utils/trycatch')
const path = require('path')
const fs = require('fs')


exports.getSignin = tryCatch((req,res,next)=>{
    res.render(
        path.join('auth',"signin"),{
            title:'Signin',
            path:'/signin'
        }
    )
})


exports.getHome = (req,res,next)=>{
req.user.getMaterials()
.then(materials=>{
    res.render(
        path.join('pages',"dashboard"),{
            title:'Home',
            path:'/dashboard',
            materials:materials
        }
      )
})
 .catch(error=>{
    console.log(error)
 })
}
exports.getAddMaterial = (req,res,next)=>{
    res.render(
        path.join('pages',"addmaterial"),{
            title:'Add Material',
            path:'/add_material',
            message:req.flash('info')[0]
        }
    )
}
exports.postAddMaterial = (req,res,next)=>{
    const {material,amount,unit} = req.body
    const {filename,destination} = req.file
    const image = (destination+filename).slice(8)
    req.user.getMaterials({where:{material:material}})
    .then(found=>{
      if(found.length>0){
        found[0].totalAmount = parseFloat(found[0].totalAmount) + parseFloat(amount)
        found[0].amountRemaining = parseFloat(found[0].amountRemaining) + parseFloat(amount)
        fs.unlinkSync(`./public${found[0].receipt}`)
        found[0].receipt = image
        return found[0].save()
      }else{
        return req.user.createMaterial({
            material:material,
            totalAmount:amount,
            unit:unit,
            amountRemaining:amount,
            receipt:image,
            date:((new Date()).toDateString()+(new Date().toLocaleTimeString())).slice(0,24)
        })
      }
    })
    .then(saved=>{
        req.flash('info','added a newly bought material')
        res.redirect('/add_material')
    })
    .catch(error=>{
        console.log(error)
    })
}

exports.getAddRecord = (req,res,next)=>{
    req.user.getMaterials()
    .then(materials=>{
        res.render(
            path.join('pages',"addrecord"),{
                title:'Add record',
                path:'/add_record',
                message:req.flash('info')[0],
                materials:materials
            }
        )
      })
    .catch(error=>{
        console.log(error)
    })
}

exports.postAddRecord = (req,res,next)=>{
    const {materials,amount,day} = req.body
    const {filename,destination} = req.file
    const image = (destination+filename).slice(8)
    req.user.getMaterials({where:{id:materials}})
    .then(fetchedMaterials=>{
    const material = fetchedMaterials[0]
    if(parseFloat(amount)>parseFloat(material.amountRemaining)){
        req.flash('info','Please the amount used is greater than the remaining amount')
        return res.redirect('/add_records')
    }else{
        material.amountRemaining = parseFloat(material.amountRemaining) - parseFloat(amount)
       return material.save()
        .then(saved=>{
        return material.createRecord({
           recordAmount:parseFloat(amount),
           day:day,
           image:image
        })
        })
        .then(recorded=>{
            req.flash('info','You just added a new record')
            return res.redirect('/add_records')
        })
    }

    })
    .catch(error=>{
        console.log(error)
    })
}
exports.getViewRecords = tryCatch(async(req,res,next)=>{
    const materials = await req.user.getMaterials(
        {
        include:[{
            model:Record,
            required:true,
            raw:true,
            attributes:['recordAmount','date','day','image']
        }]}
        )
    res.render(
        path.join('pages',"viewrecord"),{
            title:'View record',
            path:'/view_record',
            message:req.flash('info')[0],
            materials:materials
        }
    )

})

exports.getCalculations = tryCatch((req,res,next)=>{
    res.render(
        path.join('pages',"calculation"),{
            title:'calculation',
            path:'/calc_cubicmeters',
        }
    )
})

exports.deleteMaterial = (req,res,next)=>{
    const {id} = req.body
    Material.findByPk(id)
    .then(material=>{
        fs.unlinkSync('./public'+material.receipt)
        return material.destroy()
    })
    .then(destroyed=>{
     req.flash('info','Material have been removed')
     return res.redirect('/')
    })
    .catch(error=>{
        console.log(error)
    })
}