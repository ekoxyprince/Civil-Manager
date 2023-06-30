const formCalc = document.getElementById('calculation')
const printBtn = document.getElementById('printBtn')
formCalc.addEventListener('submit',function(event){
    event.preventDefault()
    const length = document.getElementById('length').value
    const width =document.getElementById('width').value
    const thickness = document.getElementById('thickness').value
    const grade = document.getElementById('grade').value
    const volume = (l,w,t)=>{
        return l*w*t
    }
    const dryVolume  = (v)=>{
        return v*1.54
    }
    const cement = document.getElementById('cement').value
    const sand = document.getElementById('sand').value
    const aggregate = document.getElementById('aggregate').value
    const price = document.getElementById('price').value
    const parameters = {
        s:sand,
        a:aggregate,
        c:cement,
        g:grade==="undefined"?null:grade
    }
    const calculate = (parameters,volume)=>{
        let grade,sand,aggregate,cement
        grade = parameters.g
        sand = parameters.s
        cement = parameters.c
        aggregate = parameters.a
        if(grade){
            console.log(grade)
            switch (grade) {
                case 'M-10':
               cement =1;sand=3;aggregate=6; 
                break;
                case 'M-15':
                cement =1;sand=2;aggregate=4; 
                break;
                case 'M-20':
                cement =1;sand=1.5;aggregate=3; 
                break;
                case 'M-25':
                cement =1;sand=1;aggregate=2; 
                break;
          
            default:
                break;
          }
        }
     
      let total = parseFloat(cement) + parseFloat(sand) + parseFloat(aggregate)
      let voc = (cement/total)*volume
      let nob = (voc/0.035)
      let vos = (sand/total)*volume
      let voa = (aggregate/total)*volume
   return {
       priceOfCement:nob*price,
       volumeOfCement:voc.toFixed(2)+'m3',
       bagOfCement:nob.toFixed(2)+'bags',
       volumeofSand:vos.toFixed(2)+'m3',
       volumeOfAggregate:voa.toFixed(2)+'m3'
   }
    }
   const calcVol= volume(length,width,thickness)
   const dryVol = dryVolume(calcVol)
   const results = calculate(parameters,dryVol)
   document.getElementById('dv').textContent = dryVol.toFixed(2) +'m3'
   document.getElementById('vc').textContent = results.volumeOfCement
   document.getElementById('bc').textContent = results.bagOfCement
   document.getElementById('vs').textContent = results.volumeofSand
   document.getElementById('va').textContent = results.volumeOfAggregate
   document.getElementById('pc').textContent = '₦'+(results.priceOfCement).toFixed(2)
   printBtn.addEventListener('click',()=>{
    window.frames['print_frame'].document.body.innerHTML = document.getElementById('print_table').innerHTML
    window.frames['print_frame'].window.focus();
    window.frames['print_frame'].window.print();
})
})

const printRecord = document.getElementById('printRecord')
const tableRecord = document.getElementById('recordTable')
printRecord.addEventListener('click',()=>{
    console.log('print')
    newWin = window.open('')
    newWin.document.write(tableRecord.outerHTML)
    newWin.print()
    newWin.close()
})
alert('h')





