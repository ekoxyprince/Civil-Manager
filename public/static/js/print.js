const printRecord = document.getElementById('printRecord')
const tableRecord = document.getElementById('tableRecord')
printRecord.addEventListener('click',()=>{
    console.log('print')
    newWin = window.open('')
    newWin.document.write(tableRecord.outerHTML)
    newWin.print()
    newWin.close()
})