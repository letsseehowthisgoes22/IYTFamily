const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const mockTrips: Trip[] = [
  {
    id: 'trip-001',
    client_id: 'client-001',
    staff_id: 'staff-001',
    status: 'in_progress',
    origin_address: '123 Main St, Boston, MA',
    destination_address: '456 Oak Ave, Springfield, MA',
    scheduled_start: '2024-01-15T09:00:00Z',
    actual_start: '2024-01-15T09:15:00Z',
    scheduled_end: '2024-01-15T12:00:00Z',
    transport_mode: 'driving',
    vehicle_info: 'White Honda Accord - License: ABC123',
    notes: 'Client prefers window seat, has motion sickness medication',
    created_at: '2024-01-14T15:30:00Z',
    updated_at: '2024-01-15T09:15:00Z',
    client: {
      id: 'client-001',
      first_name: 'Sarah',
      last_name: 'Johnson',
      date_of_birth: '2008-03-15'
    },
    staff: {
      id: 'staff-001',
      first_name: 'Mike',
      last_name: 'Thompson',
      email: 'mike.thompson@iytfamily.com'
    }
  },
  {
    id: 'trip-002',
    client_id: 'client-002',
    staff_id: 'staff-002',
    status: 'scheduled',
    origin_address: '789 Pine St, Worcester, MA',
    destination_address: 'Logan International Airport, Boston, MA',
    scheduled_start: '2024-01-16T14:00:00Z',
    scheduled_end: '2024-01-16T16:30:00Z',
    transport_mode: 'flying',
    vehicle_info: 'Flight AA1234 to Denver',
    notes: 'Airport pickup required, flight departs at 6:30 PM',
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z',
    client: {
      id: 'client-002',
      first_name: 'Alex',
      last_name: 'Rodriguez',
      date_of_birth: '2007-11-22'
    },
    staff: {
      id: 'staff-002',
      first_name: 'Jennifer',
      last_name: 'Davis',
      email: 'jennifer.davis@iytfamily.com'
    }
  },
  {
    id: 'trip-003',
    client_id: 'client-003',
    staff_id: 'staff-001',
    status: 'completed',
    origin_address: '321 Elm St, Cambridge, MA',
    destination_address: 'Riverside Treatment Center, Hartford, CT',
    scheduled_start: '2024-01-12T08:00:00Z',
    actual_start: '2024-01-12T08:05:00Z',
    scheduled_end: '2024-01-12T11:00:00Z',
    actual_end: '2024-01-12T10:45:00Z',
    transport_mode: 'driving',
    vehicle_info: 'Blue Toyota Camry - License: XYZ789',
    notes: 'Successful transport, client was cooperative throughout journey',
    created_at: '2024-01-11T16:00:00Z',
    updated_at: '2024-01-12T10:45:00Z',
    client: {
      id: 'client-003',
      first_name: 'Jordan',
      last_name: 'Smith',
      date_of_birth: '2006-07-08'
    },
    staff: {
      id: 'staff-001',
      first_name: 'Mike',
      last_name: 'Thompson',
      email: 'mike.thompson@iytfamily.com'
    }
  }
];

const mockMessages: Message[] = [
  {
    id: 'msg-001',
    trip_id: 'trip-001',
    sender_id: 'staff-001',
    content: 'Trip started, currently en route. ETA remains 12:00 PM.',
    message_type: 'text',
    created_at: '2024-01-15T09:15:00Z',
    sender: {
      first_name: 'Mike',
      last_name: 'Thompson',
      role: 'staff'
    }
  },
  {
    id: 'msg-002',
    trip_id: 'trip-001',
    sender_id: 'family-001',
    content: 'Thank you for the update. Please let us know when you arrive.',
    message_type: 'text',
    created_at: '2024-01-15T09:20:00Z',
    sender: {
      first_name: 'Mary',
      last_name: 'Johnson',
      role: 'family'
    }
  }
];

const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    trip_id: 'trip-001',
    filename: 'consent_form_sarah_johnson.pdf',
    file_type: 'application/pdf',
    file_size: 245760,
    uploaded_by: 'staff-001',
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: 'doc-002',
    trip_id: 'trip-002',
    filename: 'medical_clearance_alex_rodriguez.pdf',
    file_type: 'application/pdf',
    file_size: 189440,
    uploaded_by: 'staff-002',
    created_at: '2024-01-14T10:15:00Z'
  }
];

export interface Trip {
  id: string;
  client_id: string;
  staff_id: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  origin_address: string;
  destination_address: string;
  scheduled_start: string;
  actual_start?: string;
  scheduled_end?: string;
  actual_end?: string;
  transport_mode: 'driving' | 'flying';
  vehicle_info?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
  };
  staff?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface TripCreate {
  client_id: string;
  origin_address: string;
  destination_address: string;
  scheduled_start: string;
  scheduled_end?: string;
  transport_mode: 'driving' | 'flying';
  vehicle_info?: string;
  notes?: string;
}

export interface LocationUpdate {
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
}

export interface Message {
  id: string;
  trip_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'system' | 'alert';
  created_at: string;
  sender?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

export interface Document {
  id: string;
  trip_id: string;
  filename: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export const tripAPI = {
  getTrips: async (): Promise<Trip[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trips/`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch trips: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock data:', error);
      return mockTrips;
    }
  },

  getTripDetails: async (tripId: string): Promise<Trip> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trips/${tripId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch trip details: ${response.statusText}`);
    }
    return response.json();
  },

  createTrip: async (tripData: TripCreate): Promise<Trip> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trips/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(tripData)
      });
      if (!response.ok) {
        throw new Error(`Failed to create trip: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('API unavailable, creating mock trip:', error);
      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        client_id: tripData.client_id,
        staff_id: 'current-user',
        status: 'scheduled',
        origin_address: tripData.origin_address,
        destination_address: tripData.destination_address,
        scheduled_start: tripData.scheduled_start,
        scheduled_end: tripData.scheduled_end,
        transport_mode: tripData.transport_mode,
        vehicle_info: tripData.vehicle_info,
        notes: tripData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockTrips.push(newTrip);
      return newTrip;
    }
  },

  startTrip: async (tripId: string): Promise<{ message: string; trip: Trip }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trips/${tripId}/start`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to start trip: ${response.statusText}`);
    }
    return response.json();
  },

  completeTrip: async (tripId: string): Promise<{ message: string; trip: Trip }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trips/${tripId}/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to complete trip: ${response.statusText}`);
    }
    return response.json();
  },

  updateTrip: async (tripId: string, tripData: Partial<TripCreate>): Promise<Trip> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trips/${tripId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tripData)
    });
    if (!response.ok) {
      throw new Error(`Failed to update trip: ${response.statusText}`);
    }
    return response.json();
  }
};

export const locationAPI = {
  updateLocation: async (tripId: string, location: LocationUpdate): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/locations/trips/${tripId}/location`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(location)
    });
    if (!response.ok) {
      throw new Error(`Failed to update location: ${response.statusText}`);
    }
  },

  getCurrentLocation: async (tripId: string): Promise<LocationUpdate> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/locations/trips/${tripId}/location/current`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to get current location: ${response.statusText}`);
    }
    return response.json();
  },

  getLocationHistory: async (tripId: string): Promise<LocationUpdate[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/locations/trips/${tripId}/location/history`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to get location history: ${response.statusText}`);
    }
    return response.json();
  }
};

export const messageAPI = {
  getMessages: async (tripId: string): Promise<Message[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/messages/trips/${tripId}`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock messages:', error);
      return mockMessages.filter(msg => msg.trip_id === tripId);
    }
  },

  sendMessage: async (tripId: string, content: string): Promise<Message> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/messages/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          trip_id: tripId,
          content,
          message_type: 'text'
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('API unavailable, creating mock message:', error);
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        trip_id: tripId,
        sender_id: 'current-user',
        content,
        message_type: 'text',
        created_at: new Date().toISOString(),
        sender: {
          first_name: 'Current',
          last_name: 'User',
          role: 'staff'
        }
      };
      mockMessages.push(newMessage);
      return newMessage;
    }
  }
};

export const documentAPI = {
  getDocuments: async (tripId: string): Promise<Document[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/documents/trips/${tripId}`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock documents:', error);
      return mockDocuments.filter(doc => doc.trip_id === tripId);
    }
  },

  uploadDocument: async (tripId: string, file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('trip_id', tripId);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/v1/documents/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Failed to upload document: ${response.statusText}`);
    }
    return response.json();
  },

  downloadDocument: async (documentId: string): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/documents/${documentId}/download`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to download document: ${response.statusText}`);
    }
    return response.blob();
  },

  deleteDocument: async (documentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/documents/${documentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to delete document: ${response.statusText}`);
    }
  }
};

export const userAPI = {
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch current user: ${response.statusText}`);
    }
    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  }
};

export const flightAPI = {
  getFlightInfo: async (tripId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/flights/trips/${tripId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch flight info: ${response.statusText}`);
    }
    return response.json();
  },

  updateFlightInfo: async (tripId: string, flightData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/flights/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        trip_id: tripId,
        ...flightData
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to update flight info: ${response.statusText}`);
    }
    return response.json();
  }
};

export const handleApiError = (error: any, action: string) => {
  console.error(`Failed to ${action}:`, error);
  
  if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
    localStorage.removeItem('token');
    window.location.reload();
    return;
  }
  
  throw new Error(`Failed to ${action}. Please try again.`);
};
