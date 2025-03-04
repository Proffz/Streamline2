import MigrateLocalStorage from "@/scripts/migrate-local-storage"

export default function MigratePage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Migrate Your Data</h1>
      <p className="mb-8 text-gray-600">
        If you've been using StreamLine without an account, you can migrate your existing data to your new account. This
        will allow you to access your data from any device and keep it secure.
      </p>
      <MigrateLocalStorage />
    </div>
  )
}

