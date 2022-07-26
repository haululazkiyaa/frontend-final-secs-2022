import axios from "axios";
import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'

const axiosReq = axios.create({
    withCredentials: true
});

class JadwalMahasiswa extends Component {
    state = {
        isLoading: false,
        matkul: '',
        matkulFakultas: '',
        userMatkul: '',
        mataKuliahId: '',
        start: '',
        end: '',
        semester: '',
        disabledPilih: 'btn btn-danger disabled',
        mataKuliahDetail: {
            code: '',
            name: '',
            room: '',
            class: '',
            prodi: ''
        },
        mahasiswa: [
            {
                "schedule": [
                    "Senin"
                ],
                "start": "2",
                "end": "1",
                "semester": 1,
                "MataKuliah": {
                    "id": 16,
                    "code": "S1RPLPK5",
                    "name": "Pemrogramman Web",
                    "room": "Aula Bale Riung",
                    "class": "S1 Informatika",
                    "prodi": "FMIPA"
                }
            },
            {
                "schedule": [
                    "Senin",
                    "Selasa",
                    "Rabu"
                ],
                "start": "5",
                "end": "5",
                "semester": 1,
                "MataKuliah": {
                    "id": 14,
                    "code": "S1RPLPK1",
                    "name": "Pendidikan Kewarganegaraan",
                    "room": "Aula Bale Riung",
                    "class": "S1 Informatika",
                    "prodi": "FMIPA"
                }
            },
            {
                "schedule": [
                    "Rabu",
                    "Sabtu"
                ],
                "start": "09.00",
                "end": "10.00",
                "semester": 1,
                "MataKuliah": {
                    "id": 18,
                    "code": "KLK",
                    "name": "Kalkulus",
                    "room": "2",
                    "class": "Matematika",
                    "prodi": "FMIPA"
                }
            },
            {
                "schedule": [
                    "Selasa"
                ],
                "start": "09.00",
                "end": "10.00",
                "semester": 1,
                "MataKuliah": {
                    "id": 10,
                    "code": "S1RPLPAI1",
                    "name": "Pendidikan Agama Islam",
                    "room": "3",
                    "class": "S1 Rekayasa Perangkat Lunak",
                    "prodi": "FMIPA"
                }
            }
        ],
        schedule: {
            Senin: [],
            Selasa: [],
            Rabu: [],
            Kamis: [],
            Jumat: [],
            Sabtu: [],
            Minggu: [],
        }
    }

    componentDidMount() {
        this.setJadwal();
      }
    

    // handle jadwal mahasiswa
    setJadwal = () => {
        const newSchedule = {
            Senin: [],
            Selasa: [],
            Rabu: [],
            Kamis: [],
            Jumat: [],
            Sabtu: [],
            Minggu: [],
        }
    
        for(const matkul of this.state.mahasiswa) {
            for(const jadwal of matkul.schedule) {
                if(!newSchedule[jadwal]) {
                newSchedule[jadwal] = []
                } else {
                newSchedule[jadwal].push(this.state.mahasiswa);
                }
            }
        }

        this.setState({
            schedule: newSchedule
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.start !== this.state.start) {
            this.valPilih();
        } else if (prevState.end !== this.state.end) {
            this.valPilih();
        } else if (prevState.semester !== this.state.semester) {
            this.valPilih();
        } else if (prevState.schedule.length !== this.state.schedule.length) {
            this.valPilih();
        }
      }

    // validasi pilih matkul
    valPilih = () => {
        if(this.state.start === "" || this.state.end === "" || this.state.semester === "" || this.state.schedule.length === 0) {
            this.setState({disabledPilih: 'btn btn-danger disabled'})
        } else (
            this.setState({disabledPilih: 'btn btn-danger'})
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

    // handle change
    handleChange = (e) => {
        e.preventDefault();
    
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    };

    // handle day
    handleDay = (e) => {
        let newSchedule = [...this.state.schedule, e.target.id];
        if (this.state.schedule.includes(e.target.id)) {
            newSchedule = newSchedule.filter(day => day !== e.target.id);
        }
        this.setState({
            schedule: newSchedule
        });
      };

    // handle pilih mata kuliah
    handlePilih = (e) => {
        e.preventDefault();

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
        title: 'Anda yakin?',
        text: 'Anda akan memilih mata kuliah ini.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yakin',
        cancelButtonText: 'Batal',
        reverseButtons: false
        }).then((result) => {
        if (result.isConfirmed) {
            this.props.notify('info', 'Menambahkan mata kuliah ke jadwal anda, jangan menutup halaman!'); 

            return axiosReq.post('https://secs2022-api.herokuapp.com/user-matakuliah', {
                mataKuliahId: this.state.mataKuliahId,
                start: this.state.start,
                end: this.state.end,
                semester: this.state.semester,
                schedule: this.state.schedule
            })
                .then(() => {
                    this.setState({
                        isLoading: false,
                    })

                    this.props.notify('success', 'Data telah ditambahkan ke jadwal anda!');
                    this.getMatkul();
                })
                .catch(err => {
                    this.setState({
                        isLoading: false
                    })
    
                    if(err.response.status === 401) {
                        this.props.notify('error', 'Harap login kembali!');
                    } else {
                        this.props.notify('error', 'Data gagal ditambahkan,' + err.response.data.message);
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
                width: '75px',
                cell: row =>    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                    <button className="btn btn-danger" type="button"  data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable2" onClick={() => {this.setState({mataKuliahDetail: row, mataKuliahId: row.id})}}>Pilih</button>
                                </div>
            }
        ];

        return(
            <React.Fragment>
                <button className="btn btn-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable" onClick={this.getMatkul}>Pilih Mata Kuliah</button>
                <table className="table table-bordered">
                    <tbody>
                        {Object.keys(this.state.schedule).map((key) => (
                            <tr key={key}>
                                <th className="table-danger text-center" scope="row">
                                    {key}
                                </th>
                                {this.state.schedule[key].length > 0 &&
                                    this.state.schedule[key].map((data, index) => (
                                    <td
                                        key={index}
                                    >
                                        {data[index].MataKuliah.name}
                                    </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenteredScrollableTitle">Pilih Mata Kuliah</h5>
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
                                <div>
                                    <DataTable 
                                        columns={columns} 
                                        data={this.state.matkulFakultas} 
                                        expandableRows 
                                        expandableRowsComponent={this.expand} 
                                        pagination
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModalCenteredScrollable2" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle2" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenteredScrollableTitle2">Pilih Mata Kuliah</h5>
                                    <button className="btn-close" type="button"  data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handlePilih}>
                                        <div className="mb-3 mx-1 row">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="table-danger text-center" colSpan="2"><strong>Detail Mata Kuliah</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: "50%"}}><strong>Mata Kuliah:</strong> {this.state.mataKuliahDetail.name}</td>
                                                    <td style={{width: "50%"}}><strong>Kode:</strong> {this.state.mataKuliahDetail.code}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Fakultas:</strong> {this.state.mataKuliahDetail.prodi}</td>
                                                    <td><strong>Prodi:</strong> {this.state.mataKuliahDetail.class}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Ruangan:</strong> {this.state.mataKuliahDetail.room}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="3">Semester</label>
                                            <div className="col-sm-8">
                                                <input name="semester" className="form-control" id="3" type="number" placeholder="Pilih semster 1-8" min="1" max="8" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="4">Jam Mulai</label>
                                            <div className="col-sm-8">
                                                <input name="start" className="form-control" id="4" type="text" placeholder="Jam mulai kuliah (Cth: 09.00)" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label" htmlFor="5">Jam Selesai</label>
                                            <div className="col-sm-8">
                                                <input name="end" className="form-control" id="5" type="text" placeholder="Jam selesai kuliah (Cth: 09.00)" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label className="col-sm-4 col-form-label">Hari Kuliah</label>
                                            <div className="col-sm-8">
                                                <div className="row row-cols-2 row-cols-sm-4">
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Senin" value="Senin" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Senin">Senin</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Selasa" value="Selasa" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Selasa">Selasa</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Rabu" value="Rabu" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Rabu">Rabu</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Kamis" value="Kamis" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Kamis">Kamis</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Jumat" value="Jumat" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Jumat">Jumat</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Sabtu" value="Sabtu" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger mb-3" htmlFor="Sabtu">Sabtu</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" className="btn-check" id="Minggu" value="Minggu" onChange={this.handleDay} />
                                                        <label className="btn btn-outline-danger" htmlFor="Minggu">Minggu</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" id="pilih" hidden />
                                    </form> 
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-danger" type="button" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Batal</button>
                                    <label className={this.state.disabledPilih} htmlFor="pilih" data-coreui-toggle="modal" data-coreui-target="#exampleModalCenteredScrollable">Simpan</label>
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default withAuth(JadwalMahasiswa)