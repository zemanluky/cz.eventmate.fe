import {create} from 'zustand';

interface EventStore {
    event: any;
    loading: boolean;
    error: string | null;
    setEvent: (event: any) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    updateAttendees: (newAttendees: any[]) => void; // Add the updateAttendees function
  }

export const useEventStore = create<EventStore>((set) => ({
    event: null,
    loading: false,
    error: null,
    setEvent: (event) => set({ event }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    updateAttendees: (newAttendees) => set((state) => ({
      event: {
        ...state.event,
        attendees: newAttendees,
      },
    })),
  }));
