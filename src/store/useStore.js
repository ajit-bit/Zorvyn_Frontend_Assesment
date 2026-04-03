import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTransactions } from "../data";

export const useStore = create(
  persist(
    (set) => ({
      // State
      transactions: initialTransactions,
      role: "viewer", // viewer or admin
      darkMode: true,
      searchQuery: "",
      filterCategory: "all",
      filterType: "all",
      currentPage: "dashboard", // dashboard | transactions | insights
      isLoading: false,
      deleteConfirmId: null,
      sortBy: "date", // date or amount
      sortOrder: "desc", // asc or desc
      showModal: false,
      notifications: [
        { id: 1, title: "Welcome to FinanceApp", message: "Your dashboard is ready.", time: "Just now", read: false },
        { id: 2, title: "Monthly report generated", message: "Your April finance summary is available.", time: "2h ago", read: false },
        { id: 3, title: "Action required", message: "Review the overdue bills for this month.", time: "6h ago", read: false },
      ],

      // Actions
      addTransaction: (transaction) =>
        set((state) => {
          const generated = { ...transaction, id: Date.now() };
          return {
            transactions: [...state.transactions, generated],
            notifications: [
              ...state.notifications,
              {
                id: Date.now() + 1,
                title: "New transaction added",
                message: `${generated.type === "income" ? "Income" : "Expense"} ${generated.category} for ${generated.amount.toLocaleString()} added successfully.`,
                time: "Just now",
                read: false,
              },
            ],
          };
        }),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setRole: (role) => set({ role }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterCategory: (category) => set({ filterCategory: category }),
      setFilterType: (type) => set({ filterType: type }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setShowModal: (show) => set({ showModal: show }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setDeleteConfirmId: (id) => set({ deleteConfirmId: id }),
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false },
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      // Filtered & sorted transactions
      getFilteredTransactions: (state) => {
        let filtered = state.transactions;

        // Search filter
        if (state.searchQuery) {
          filtered = filtered.filter((t) =>
            t.category.toLowerCase().includes(state.searchQuery.toLowerCase())
          );
        }

        // Category filter
        if (state.filterCategory !== "all") {
          filtered = filtered.filter((t) => t.category === state.filterCategory);
        }

        // Type filter
        if (state.filterType !== "all") {
          filtered = filtered.filter((t) => t.type === state.filterType);
        }

        // Sorting
        filtered.sort((a, b) => {
          let comparison = 0;
          if (state.sortBy === "date") {
            comparison = new Date(a.date) - new Date(b.date);
          } else if (state.sortBy === "amount") {
            comparison = a.amount - b.amount;
          }
          return state.sortOrder === "asc" ? comparison : -comparison;
        });

        return filtered;
      },
    }),
    {
      name: "finance-dashboard",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
        filterCategory: state.filterCategory,
        filterType: state.filterType,
        currentPage: state.currentPage,
        notifications: state.notifications,
      }),
    }
  )
);
