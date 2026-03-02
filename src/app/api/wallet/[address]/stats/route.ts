import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/constants";
import { unzipSync, strFromU8 } from "fflate";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const [tradedRes, snapshotRes] = await Promise.all([
      fetch(
        `${API_BASE.DATA}/traded?user=${encodeURIComponent(address)}`,
        { cache: "no-store" }
      ),
      fetch(
        `${API_BASE.DATA}/v1/accounting/snapshot?user=${encodeURIComponent(address)}`,
        { cache: "no-store" }
      ),
    ]);

    let traded = 0;
    if (tradedRes.ok) {
      const data = (await tradedRes.json()) as { traded?: number };
      traded = data.traded ?? 0;
    }

    let equity: number | null = null;
    if (snapshotRes.ok) {
      try {
        const buffer = await snapshotRes.arrayBuffer();
        const u8 = new Uint8Array(buffer);
        const decompressed = unzipSync(u8);
        const equityFile = decompressed["equity.csv"];
        if (equityFile) {
          const csv = strFromU8(equityFile);
          const lines = csv.trim().split("\n");
          if (lines.length >= 2) {
            const cols = lines[0].split(",");
            const values = lines[1].split(",");
            const equityIdx = cols.indexOf("equity");
            if (equityIdx !== -1) {
              const val = parseFloat(values[equityIdx]);
              if (Number.isFinite(val)) equity = val;
            }
          }
        }
      } catch {
        // Ignore snapshot parse errors
      }
    }

    return NextResponse.json({
      traded,
      equity,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch wallet stats" },
      { status: 500 }
    );
  }
}
