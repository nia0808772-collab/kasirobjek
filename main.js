// array global untuk menyimpan data barang
let dataBarang = []

//fungsi untuk format angka ke rupiah
function rupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//fungsi untuk menyimpan data barang ke dalam array
function simpan() {
  const nama = document.getElementById("nama").value
  const harga = Number(document.getElementById("harga").value) 
  const qty = Number(document.getElementById("qty").value) 
  
  //buat object barang
  const barang = {
    nama: nama, 
    harga: harga, 
    qty: qty
  }
  
  //tambah object barang ke dalam array
  dataBarang.push(barang)
  
  //tampilkan data barang
  tampilkan()
  
  //reset atau bersihkan form
  bersihkan()
}

//fungsi untuk menampilkan data barang 
function tampilkan () {
  let total = 0
    let html = ""

    // loop untuk membuat elemen HTML setiap item barang
    for (let i = 0; i < dataBarang.length; i++) {
        let barang = dataBarang[i]
        let subtotal = barang.harga * barang.qty
        total += subtotal

        html += `
            <div class="item">
                <h3>${i + 1}. ${barang.nama}</h3>
                <div class="info">Harga : Rp ${rupiah(barang.harga)}</div>
                <div class="info">Qty : ${barang.qty}</div>
                <div class="info">Subtotal : Rp ${rupiah(subtotal)}</div>
                <div class="action">
                    <button class="tombolEdit" onclick="edit(${i})">Edit</button>
                    <button class="tombolHapus" onclick="hapus(${i})">Hapus</button>
                </div>
            </div>
        `
    }

    html += `
        <div class="total">
            Total: Rp ${rupiah(total)}
        </div>
    `

    document.getElementById("hasil").innerHTML = html
}

function bersihkan() {
  document.getElementById('nama').value = ''
  document.getElementById('harga').value = ''
  document.getElementById('qty').value = 1
}

//fungsi untuk menghapus item barang
function hapus(index) {
    //menghapus item dari array berdasarkan index
    dataBarang.splice(index, 1)
    
    //seteleh berhasil di hapus, tampilkan kembali data barang yang tersisa
    tampilkan()
}