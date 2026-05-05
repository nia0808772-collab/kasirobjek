// array global untuk menyimpan data barang
// ambil dari local storage jika ada, jika tidak buat array kosong
let dataBarang = JSON.parse(localStorage.getItem("KASIR")) || [{
    nama:"Pensil", 
    harga:10000, 
    qty:2
}]

//variabel global untuk menyimpan index barang yang sedang diedit
let indexEdit = -1

//fungsi untuk menyimpan data barang ke local storage
//setiap kali data berubah (simpan, ubah, hapus)
function simpanKeStorage() {
    localStorage.setItem("KASIR",JSON.stringify(dataBarang))
}

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
  
  //simpan data barang ke local storage
  simpanKeStorage()
  
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
  
  modeSimpan()
}

//fungsi untuk menghapus item barang
function hapus(index) {
    //menghapus item dari array berdasarkan index
    dataBarang.splice(index, 1)
    
      //simpan data barang ke local storage
  simpanKeStorage()
    
    //seteleh berhasil di hapus, tampilkan kembali data barang yang tersisa
    tampilkan()
   
    
}

//fungsi untuk menampilkan data barang yang akan di edit
//nmenerima parameter index untuk mengetahui item mana yang akan diedit
function edit(index) {
    //ambil data barang yang akan diedit berdasarkan index
    const barang = dataBarang[index]
    
    //tampilkan data barang di form input untuk diedit
    document.getElementById('nama').value = barang.nama
  document.getElementById('harga').value = barang.harga
  document.getElementById('qty').value = barang.qty
  
  //simpan undex barang yang sedang diedit ke variabel global
  indexEdit = index
  
  modeEdit()
}

//fungsi untuk menyimpan perubahan data barang yang sudah diedit
function ubah() {
    //pastikan ada item yang sedang diedit
    if (indexEdit == -1) {
alert("Tidak ada item yang sedang diedit.")    

//hentikan fungsi jika tidak ada item yang sedang di edit
return
    }
    //ambil nilai dari input
    const nama = document.getElementById("nama").value
  const harga = Number(document.getElementById("harga").value)
  const qty = Number(document.getElementById("qty").value) 
  
  // simpan perubahan data barang ke dalam array berdasarkan index yang sedang di edit
  dataBarang[indexEdit].nama = nama
  dataBarang[indexEdit].harga = harga
  dataBarang[indexEdit].qty = qty
  
  //reset index edit setelah perubahan di simpan 
  indexEdit = -1
  
    //simpan data barang ke local storage
  simpanKeStorage()
  
  //bersihkanform setelah mengambil nilai
  bersihkan()
  
  // tampilkan kembali data berang yang sudah di ubah
  tampilkan()
  
  modeSimpan() 
}

//fungsi untuk menonaktifkan tombol simpan dan aktifkan tombol update saat ada item yang sedang di edit
function modeEdit() {
    document.getElementById('tombolTambah').disabled = true
    document.getElementById('tombolUpdate').disabled = false
}

//fungsi untik menonaktifkan tombol update dan aktifkan tombol simpan saat tidak ada item yang sedang di edit
function modeSimpan() {
document.getElementById('tombolTambah').disabled = false
 document.getElementById('tombolUpdate').disabled = true
}

simpanKeStorage()

//memanggil fungsi tampilkan untuk menampilkan
//data barang saat pertama kali dimuat
tampilkan()
