import type { Part4Set } from '../data/study'

/** Part 4 표 — 시험 화면처럼 제목 + 표 + 하단 메모 */
export default function InfoTable({ set }: { set: Part4Set }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        {set.header.map((h, i) => (
          <div key={h} style={i === 0 ? { fontWeight: 800, fontSize: '1.05rem' } : { fontSize: '0.9rem' }}>
            {h}
          </div>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          {set.columns && (
            <thead>
              <tr>
                {set.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {set.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} className="pre">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {set.footer?.map((f) => (
        <div key={f} className="small" style={{ marginTop: 6 }}>
          {f}
        </div>
      ))}
    </div>
  )
}
