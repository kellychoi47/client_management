import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [newClient, setNewClient] = useState({ clientid: "", company_name: "", contact_name: "", email: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const getAllClients = () => {
    axios.get("http://localhost:3006/client")
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients:", err));
  };

  useEffect(() => {
    getAllClients();
  }, []);

  // Open modal for adding or editing
  const openModal = (client = null) => {
    setCurrentClient(client);
    setNewClient(client || { clientid: "", company_name: "", contact_name: "", email: "" });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (Add or Edit) with validation
  const handleSave = async (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (!newClient.company_name || !newClient.contact_name || !newClient.email) {
      alert("All fields are required.");
      return;
    }

    try {
      if (currentClient) {
        await axios.patch(`http://localhost:3006/client/${newClient.clientid}`, newClient);
      } else {
        await axios.post("http://localhost:3006/client", newClient);
      }
      getAllClients();
      closeModal();
    } catch (err) {
      console.error("Error saving client:", err);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (clientid) => {
    setClientToDelete(clientid);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete
  const handleDelete = () => {
    axios.delete(`http://localhost:3006/client/${clientToDelete}`)
      .then(() => {
        getAllClients();
        setIsDeleteModalOpen(false);
      })
      .catch(err => console.error("Error deleting client:", err));
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  // Filtered client list
  const filteredClients = clients.filter(
    (client) =>
      client.company_name.toLowerCase().includes(search.toLowerCase()) ||
      client.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="title">Client Management</div>  
      <div className="search-section">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="add-section">
        <button className="add-btn" onClick={() => openModal()}>Add Client</button>
      </div>

      {/* Client Grid */}
      <div className="grid-container">
  <div className="grid-header">
    <span>Client ID</span>
    <span>Company Name</span>
    <span>Contact Name</span>
    <span>Email</span>
    <span>Edit</span>
    <span>Delete</span>
  </div>

  {filteredClients.length > 0 ? (
    filteredClients.map(client => (
      <div className="grid-row" key={client.clientid}>
        <span>{client.clientid}</span>
        <span>{client.company_name}</span>
        <span>{client.contact_name}</span>
        <span>{client.email}</span>
        <button className="edit-btn" onClick={() => openModal(client)}>Edit</button>
        <button className="delete-btn" onClick={() => confirmDelete(client.clientid)}>Delete</button>
      </div>
    ))
  ) : (
    <p>No matching clients found.</p>
  )}
</div>

      {/* Add/Edit Client Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{currentClient ? "Edit Client" : "Add New Client"}</h2>
            <form onSubmit={handleSave}>
              <input type="text" name="company_name" placeholder="Company Name" value={newClient.company_name} onChange={handleChange} />
              <input type="text" name="contact_name" placeholder="Contact Name" value={newClient.contact_name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={newClient.email} onChange={handleChange} />
              <div className="modal-buttons">
                <button className="save-btn" type="submit">Save</button>
                <button className="close-btn" type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this client?</p>
            <div className="modal-buttons">
              <button className="delete-confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="close-btn" onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;