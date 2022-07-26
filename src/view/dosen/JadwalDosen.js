import axios from "axios";
import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'

const axiosReq = axios.create({
    withCredentials: true
});

class JadwalDosen extends Component {
    state = {
        isLoading: false,
        matkul: '',
        matkulFakultas: '',
        prodi: '',
        class: '',
        name: '',
        code: '',
        room:'',
        editId: '',
        editProdi: '',
        editClass: '',
        editName: '',
        editCode: '',
        editRoom: '',
        disabledAdd: 'btn btn-danger disabled',
        disabledEdit: 'btn btn-danger disabled'
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.prodi !== this.state.prodi) {
            this.valTambah();
        } else if (prevState.class !== this.state.class) {
            this.valTambah();
        } else if (prevState.name !== this.state.name) {
            this.valTambah();
        } else if (prevState.code !== this.state.code) {
            this.valTambah();
        } else if (prevState.room !== this.state.room) {
            this.valTambah();
        }  else if (prevState.editName !== this.state.editName) {
            this.valEdit();
        } else if (prevState.editCode !== this.state.editCode) {
            this.valEdit();
        } else if (prevState.editRoom !== this.state.editRoom) {
            this.valEdit();
        }
      }

    // validasi tambah data
    valTambah = () => {
        if(this.state.prodi === "" || this.state.class === "" || this.state.name === "" || this.state.code === "" || this.state.room === "") {
            this.setState({disabledAdd: 'btn btn-danger disabled'})
        } else (
            this.setState({disabledAdd: 'btn btn-danger'})
        )
    }

    // validasi edit data
    valEdit = () => {
        if(this.state.editName === "" || this.state.editCode === "" || this.state.editRoom === "") {
            this.setState({disabledEdit: 'btn btn-danger disabled'})
        } else (
            this.setState({disabledEdit: 'btn btn-danger'})
        )
    }

    // session handler
    getMatkul = () => {
        this.setState({
            isLoading: true,
        })

        return axiosReq.get('https://secs2022-api.herokuapp.com/mata-kuliah')
            .then(res => {
                this.setState({
                    isLoading: false,
                    matkul: res.data,
                    matkulFakultas: res.data
                })
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })

                if(err.response.status === 401) {
                    this.props.notify('error', 'Harap login kembali!');
                } else {
                    this.props.notify('error', 'Terjadi kesalahan!');
                }
            })
    }

    // menghapus mata kuliah
    deleteMatkul = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
        title: 'Anda yakin?',
        text: 'Data mata kuliah ini akan dihapus secara permanen?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yakin',
        cancelButtonText: 'Batal',
        reverseButtons: false
        }).then((result) => {
        if (result.isConfirmed) {
            this.props.notify('info',  'Menghapus data, jangan menutup halaman!');
            let reqUrl = 'https://secs2022-api.herokuapp.com/mata-kuliah/' + e.target.getAttribute("data-id")

            this.setState({
                isLoading: true,
            })

            return axiosReq.delete(reqUrl)
                .then(res => {
                    this.setState({
                        isLoading: false,
                    })

                    this.props.notify('success', 'Data mata kuliah dihapus!');
                    this.getMatkul();
                })
                .catch(err => {
                    this.setState({
                        isLoading: false
                    })

                    if(err.response.status === 401) {
                        this.props.notify('error', 'Harap login kembali!');
                    } else {
                        this.props.notify('error', 'Terjadi kesalahan!');
                    }
                })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            this.props.notify('warning', 'Anda batal menghapus data!');
        }
        })
    }

    // filter mata kuliah
    filterFakultas = (e) => {
        if(e.target.value === '') {
            this.setState({
                matkulFakultas: this.state.matkul
            })
        } else {
            let newMatkul = this.state.matkul.filter((result) => {
                return result.class === e.target.value
            })

            this.setState({
                matkulFakultas: newMatkul
            })
        }
    }

    // handle change
    handleChange = (e) => {
        e.preventDefault();
    
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    };

    // handle tambah mata kuliah
    handleTambah = (e) => {
        e.preventDefault();
        this.props.notify('info', 'Menmabah data, jangan menutup halaman!');

        this.setState({
            isLoading: true,
        })

        return axiosReq.post('https://secs2022-api.herokuapp.com/mata-kuliah', {
            prodi: this.state.prodi,
            class: this.state.class,
            name: this.state.name,
            code: this.state.code,
            room: this.state.room,
        })
            .then(() => {
                this.setState({
                    isLoading: false
                })

                this.props.notify('success', 'Data mata kuliah ditambahkan!');
                this.getMatkul();
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })

                if(err.response.status === 401) {
                    this.props.notify('error', 'Harap login kembali!');
                } else {
                    this.props.notify('error', 'Data gagal disimpan,' + err.response.data.message);
                }
            })
    }

    // handle edit mata kuliah
    handleEdit = (e) => {
        e.preventDefault();
        this.props.notify('info', 'Memperbarui data, jangan menutup halaman!');
        let reqUrl = 'https://secs2022-api.herokuapp.com/mata-kuliah/' + this.state.editId

        console.log(reqUrl)
        this.setState({
            isLoading: true,
        })

        return axiosReq.patch(reqUrl, {
            'prodi': this.state.editProdi,
            'class': this.state.editClass,
            'name': this.state.editName,
            'code': this.state.editCode,
            'room': this.state.editRoom,
        })
            .then(res => {
                this.setState({
                    isLoading: false,
                })

                this.props.notify('success', 'Data mata kuliah diperbarui!');
                this.getMatkul();
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })

                if(err.response.status === 401) {
                    this.props.notify('error', 'Harap login kembali!');
                } else {
                    this.props.notify('error', 'Terjadi kesalahan!');
                }
            })
    }

    // handle expand table
    expand = (get) => {
        return(
            <table>
                <tbody>
                    <tr>
                        <th>Fakultas:</th>
                        <td>{get.data.prodi}</td>
                    </tr>
                    <tr>
                        <th>Prodi:</th>
                        <td>{get.data.class}</td>
                    </tr>
                    <tr>
                        <th>Ruangan:</th>
                        <td>{get.data.room}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        const columns = [
            {
                name: 'Mata Kuliah',
                selector: row => row.name,
            },
            {
                name: 'Kode',
                selector: row => row.code,
            },
            {
                name: 'Aksi',
                button: true,
                width: '125px',
                cell: row =>    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                    <button className="btn btn-outline-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable2" onClick={() => {this.setState({editId: row.id, editProdi: row.prodi, editClass: row.class, editName:row.name, editRoom:row.room, editCode:row.code})}}>Edit</button>
                                    <button className="btn btn-danger" type="button" data-id={row.id} onClick={this.deleteMatkul}>Hapus</button>
                                </div>
            }
        ];

        return(
            <React.Fragment>
                <button className="btn btn-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable" onClick={this.getMatkul}>Lihat Mata Kuliah</button>
                <DataTable 
                    columns={columns} 
                    data={this.state.test} 
                    expandableRows 
                    expandableRowsComponent={this.expand} 
                    pagination
                    noDataComponent="Anda tidak memiliki jadwal mengajar saat ini"
                />
                <div id="parent">
                    <div className="modal fade" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenteredScrollableTitle">Tambah Mata Kuliah</h5>
                                    <button className="btn-close" type="button" data-coreui-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <p>Daftar mata kuliah yang tersedia:</p>
                                        </div>
                                        <div className="col">
                                            <select name="filter-fakultas" className="form-select form-select-sm" onChange={this.filterFakultas}>
                                                <option value="">Semua Prodi</option>
                                                <option value="S1 Informatika">S1 Informatika</option>
                                                <option value="S1 Ilmu Komputer">S1 Ilmu Komputer</option>
                                                <option value="S1 Rekayasa Perangkat Lunak">S1 Rekayasa Perangkat Lunak</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-danger" type="button" hidden={this.state.isLoading === true || this.state.matkul === "" || false} onClick={this.getMatkul}>
                                        Refresh
                                    </button>
                                    <button className="btn btn-outline-danger" type="button" hidden={this.state.isLoading === false} disabled>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Mengambil data...
                                    </button>
                                    <button className="btn btn-danger ms-2" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable1">Tambah Mata Kuliah</button>
                                    <div>
                                        <DataTable 
                                            columns={columns} 
                                            data={this.state.matkulFakultas} 
                                            expandableRows 
                                            expandableRowsComponent={this.expand} 
                                            pagination
                                            noDataComponent="Belum ada mata kuliah yang ditambahkan."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalCenteredScrollable1" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenteredScrollableTitle1">Tambah Mata Kuliah</h5>
                                    <button className="btn-close" type="button"  data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleTambah}>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="1">Fakultas</label>
                                            <div className="col-sm-8">
                                                <select name="prodi" className="form-select form-select-sm"  onChange={this.handleChange} required>
                                                    <option value="" readOnly>Pilih</option>
                                                    <option value="FMIPA">FMIPA</option>
                                                    <option value="FTTM">FTTM</option>
                                                    <option value="FISIP">FISIP</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="2">Prodi</label>
                                            <div className="col-sm-8">
                                                <select name="class" className="form-select form-select-sm" onChange={this.handleChange} required>
                                                    <option value="" readOnly>Pilih</option>
                                                    <option value="S1 Informatika">S1 Informatika</option>
                                                    <option value="S1 Rekayasa Perangkat Lunak">S1 Rekayasa Perangkat Lunak</option>
                                                    <option value="S1 Ilmu Komputer">S1 Ilmu Komputer</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="3">Mata Kuliah</label>
                                            <div className="col-sm-8">
                                                <input name="name" className="form-control" id="3" type="text" placeholder="Nama/judul Mata Kuliah" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="4">Kode</label>
                                            <div className="col-sm-8">
                                                <input name="code" className="form-control" id="4" type="text" placeholder="Kode mata kuliah" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="5">Ruangan</label>
                                            <div className="col-sm-8">
                                                <input name="room" className="form-control" id="5" type="text" placeholder="Gedung/ruangan/tempat PBM" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <input type="submit" id="tambah" hidden />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Batal</button>
                                    <label className={this.state.disabledAdd} htmlFor="tambah" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Simpan</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalCenteredScrollable2" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle2" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenteredScrollableTitle2">Edit Mata Kuliah</h5>
                                    <button className="btn-close" type="button"  data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleEdit}>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="1">Fakultas</label>
                                            <div className="col-sm-8">
                                                <input className="form-control-plaintext" id="1" type="text" readOnly value={this.state.editProdi} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="2">Prodi</label>
                                            <div className="col-sm-8">
                                                <input className="form-control-plaintext" id="1" type="text" readOnly value={this.state.editClass} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="3">Mata Kuliah</label>
                                            <div className="col-sm-8">
                                                <input name="editName" className="form-control" id="3" type="text" value={this.state.editName} onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="4">Kode</label>
                                            <div className="col-sm-8">
                                                <input name="editCode" className="form-control" id="4" type="text" value={this.state.editCode} onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="5">Ruangan</label>
                                            <div className="col-sm-8">
                                                <input name="editRoom" className="form-control" id="5" type="text" value={this.state.editRoom} onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <input type="submit" id="edit" hidden />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Batal</button>
                                    <label className={this.state.disabledEdit} htmlFor="edit" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Simpan</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withAuth(JadwalDosen)