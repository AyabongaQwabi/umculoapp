import { fetchAllSignups } from "@/lib/signups/storage";
import type { Signup, SignupStatus } from "@/lib/signups/types";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Johannesburg",
  }).format(new Date(iso));
}

function statusLabel(status: SignupStatus): string {
  if (status === "pending_payment") return "Pending Payment";
  if (status === "paid") return "Paid";
  return "Payment Failed";
}

function statusClass(status: SignupStatus): string {
  if (status === "paid") return "border-green/40 bg-green/10 text-green";
  if (status === "payment_failed") return "border-red/40 bg-red/10 text-red";
  return "border-gold/40 bg-gold/10 text-gold";
}

export default async function AdminPage() {
  let signups: Signup[] = [];
  let error: string | null = null;

  try {
    signups = await fetchAllSignups();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Could not load signups from storage.";
    signups = [];
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-black uppercase tracking-wide">
          Umculo Signups
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Every signup is saved when the form is submitted — including people who
          never completed payment. Newest first.
        </p>

        {error ? (
          <p className="mt-8 rounded-lg border border-red/40 bg-red/10 p-4 text-sm text-red">
            {error}
          </p>
        ) : null}

        {signups.length === 0 && !error ? (
          <p className="mt-8 text-sm text-white/60">No signups yet.</p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Date
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Status
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Name
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Business
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Email
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Phone
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Package
                  </th>
                  <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-white/50">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup) => (
                  <tr
                    key={signup.id}
                    className="border-b border-white/5 align-top last:border-b-0"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-white/70">
                      {formatDate(signup.createdAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusClass(signup.status)}`}
                      >
                        {statusLabel(signup.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{signup.name}</td>
                    <td className="px-4 py-3">{signup.businessName}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${signup.email}`}
                        className="text-gold hover:underline"
                      >
                        {signup.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {signup.phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {signup.package}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {signup.priceMonthly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
