export default function ThemeTest() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 space-y-12">

      {/* Header */}
      <div className="space-y-1 border-b border-border pb-6">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Design System</p>
        <h1 className="text-4xl tracking-widest uppercase text-primary font-light">
          Black × Gold
        </h1>
        <p className="text-sm text-muted-foreground">globals.css token coverage test</p>
      </div>

      {/* Background Surfaces */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Background Tokens</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-background border border-border rounded-sm p-4">
            <p className="text-xs text-muted-foreground">bg-background</p>
          </div>
          <div className="bg-card rounded-sm p-4">
            <p className="text-xs text-muted-foreground">bg-card</p>
          </div>
          <div className="bg-secondary rounded-sm p-4">
            <p className="text-xs text-muted-foreground">bg-secondary</p>
          </div>
          <div className="bg-muted rounded-sm p-4">
            <p className="text-xs text-muted-foreground">bg-muted</p>
          </div>
          <div className="bg-popover rounded-sm p-4">
            <p className="text-xs text-muted-foreground">bg-popover</p>
          </div>
          <div className="bg-accent rounded-sm p-4">
            <p className="text-xs text-accent-foreground">bg-accent</p>
          </div>
          <div className="bg-primary rounded-sm p-4">
            <p className="text-xs text-primary-foreground">bg-primary</p>
          </div>
          <div className="bg-destructive rounded-sm p-4">
            <p className="text-xs text-white">bg-destructive</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Typography</p>
        <div className="bg-card border border-border rounded-sm p-6 space-y-3">
          <p className="text-foreground text-2xl tracking-widest uppercase font-light">
            text-foreground — Maison de Couture
          </p>
          <p className="text-primary text-base tracking-widest uppercase">
            text-primary (gold) — Limited Edition SS25
          </p>
          <p className="text-muted-foreground text-sm">
            text-muted-foreground — Supporting detail and caption text
          </p>
          <p className="text-secondary-foreground text-sm">
            text-secondary-foreground
          </p>
          <p className="text-card-foreground text-sm">
            text-card-foreground
          </p>
          <p className="text-accent-foreground bg-accent inline-block px-2 py-0.5 text-sm">
            text-accent-foreground on bg-accent
          </p>
        </div>
      </section>

      {/* Border & Ring */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Border & Ring</p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-24 h-12 border border-border rounded-sm flex items-center justify-center">
            <span className="text-xs text-muted-foreground">border</span>
          </div>
          <div className="w-24 h-12 border border-input bg-input rounded-sm flex items-center justify-center">
            <span className="text-xs text-muted-foreground">input</span>
          </div>
          <div className="w-24 h-12 ring-2 ring-ring rounded-sm flex items-center justify-center">
            <span className="text-xs text-muted-foreground">ring</span>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Buttons</p>
        <div className="flex flex-wrap gap-3">
          {/* primary */}
          <button className="bg-primary text-primary-foreground px-6 py-2 text-xs tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity">
            Shop Now
          </button>
          {/* outline */}
          <button className="bg-transparent text-primary border border-border px-6 py-2 text-xs tracking-widest uppercase rounded-sm hover:border-primary transition-colors">
            View Collection
          </button>
          {/* secondary */}
          <button className="bg-secondary text-secondary-foreground px-6 py-2 text-xs tracking-widest uppercase rounded-sm hover:opacity-80 transition-opacity">
            Secondary
          </button>
          {/* muted / ghost */}
          <button className="bg-muted text-muted-foreground px-6 py-2 text-xs tracking-widest uppercase rounded-sm hover:text-foreground transition-colors">
            Ghost
          </button>
          {/* destructive */}
          <button className="bg-destructive text-white px-6 py-2 text-xs tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity">
            Remove
          </button>
        </div>
      </section>

      {/* Input / Form */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Form Inputs</p>
        <div className="bg-card border border-border rounded-sm p-6 space-y-4 max-w-sm">
          <div className="space-y-1">
            <label className="text-xs tracking-widest uppercase text-muted-foreground">Email</label>
            <input
              className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs tracking-widest uppercase text-muted-foreground">Message</label>
            <textarea
              className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
              placeholder="Your message…"
            />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 text-xs tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity">
            Submit
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Cards</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Noir Silk Gown", price: "€ 4,200", tag: "New Arrival" },
            { title: "Velvet Blazer", price: "€ 2,800", tag: "Exclusive" },
            { title: "Gold Clutch", price: "€ 1,650", tag: "Limited" },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="bg-secondary h-36 flex items-center justify-center text-primary text-3xl border-b border-border">
                ✦
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-widest uppercase text-card-foreground">{item.title}</p>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 tracking-wider uppercase rounded-sm">
                    {item.tag}
                  </span>
                </div>
                <p className="text-primary text-sm">{item.price}</p>
                <p className="text-muted-foreground text-xs">Atelier · Made to Order</p>
                <button className="w-full mt-2 bg-primary text-primary-foreground py-1.5 text-xs tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popover / Tooltip-style */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Popover Surface</p>
        <div className="bg-popover border border-border rounded-sm p-4 max-w-xs">
          <p className="text-popover-foreground text-sm">
            bg-popover + text-popover-foreground. Used for dropdowns, tooltips, comboboxes.
          </p>
        </div>
      </section>

      {/* Radius Scale */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Radius Scale</p>
        <div className="flex flex-wrap gap-4 items-end">
          {[
            ["rounded-sm", "radius-sm"],
            ["rounded-md", "radius-md"],
            ["rounded-lg", "radius-lg"],
            ["rounded-xl", "radius-xl"],
            ["rounded-2xl", "radius-2xl"],
            ["rounded-3xl", "radius-3xl"],
            ["rounded-4xl", "radius-4xl"],
          ].map(([cls, label]) => (
            <div key={cls} className={`w-16 h-16 bg-secondary border border-border ${cls} flex items-end justify-center pb-1`}>
              <span className="text-[9px] text-muted-foreground text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar Tokens */}
      <section className="space-y-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Sidebar Tokens</p>
        <div className="bg-sidebar border border-sidebar-border rounded-sm p-4 max-w-xs space-y-3">
          <p className="text-sidebar-foreground text-xs tracking-widest uppercase">Sidebar Navigation</p>
          <div className="space-y-1">
            {["Collections", "Lookbook", "Atelier", "Contact"].map((item, i) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-sm text-sm tracking-wide cursor-pointer transition-colors ${
                  i === 0
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="px-3 py-2 bg-sidebar-primary rounded-sm text-sidebar-primary-foreground text-xs tracking-widest uppercase text-center cursor-pointer">
              Book Appointment
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          All tokens from globals.css · No light mode · Black × Gold only
        </p>
      </div>

    </div>
  );
}