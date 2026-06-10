import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';

/**
 * Casos de soporte (espejo de `support_tickets` en schema.sql).
 * Los casos pueden crearse SIN sesión (problemas de acceso): se
 * identifican por correo. Persistencia en localStorage (modo demo);
 * en producción → insert/select sobre Supabase.
 */
const SupportContext = createContext(null);

const STORAGE_KEY = 'educon_support_tickets';

function readTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function makeTicketNo() {
  return `CASO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function SupportProvider({ children }) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState(readTickets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const value = useMemo(
    () => ({
      /** Casos visibles: los del correo de la sesión, o todos los del navegador si es invitado. */
      myTickets(email) {
        const target = (email ?? user?.email ?? '').toLowerCase();
        if (!target) return tickets;
        return tickets.filter((t) => t.email.toLowerCase() === target);
      },

      createTicket({ fullName, email, category, subject, description }) {
        const ticket = {
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          ticketNo: makeTicketNo(),
          userId: user?.id ?? null,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          category,
          subject: subject.trim(),
          description: description.trim(),
          status: 'abierto',
          createdAt: new Date().toISOString(),
        };
        setTickets((prev) => [ticket, ...prev]);
        return ticket;
      },
    }),
    [tickets, user?.id, user?.email]
  );

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
}

export function useSupport() {
  const ctx = useContext(SupportContext);
  if (!ctx) throw new Error('useSupport debe usarse dentro de <SupportProvider>');
  return ctx;
}
