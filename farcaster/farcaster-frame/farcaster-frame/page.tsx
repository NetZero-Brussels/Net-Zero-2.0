export default function Home() {
  return (
    <main className={}>
      <div className={}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p>
            Head to{" "}
            <a
              href="/api/dev"
              style={{ display: "inline", fontWeight: "semibold" }}
            >
              <code className={}>localhost:3000/api</code>
            </a>{" "}
            for your frame endpoint.
          </p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
