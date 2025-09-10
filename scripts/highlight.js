// Minimal Rust syntax highlighter (client-side, no deps)
// Token classes: tok-key, tok-type, tok-macro, tok-num, tok-str, tok-cmt, tok-attr, tok-life

(function(){
  const KEYWORDS = new Set([
    'as','break','const','continue','crate','else','enum','extern','false','fn','for','if','impl','in','let','loop','match','mod','move','mut','pub','ref','return','self','Self','static','struct','super','trait','true','type','unsafe','use','where','while','dyn','async','await'
  ]);
  const PRIMITIVES = new Set([
    'bool','char','str','String','u8','u16','u32','u64','u128','usize','i8','i16','i32','i64','i128','isize','f32','f64','Option','Result','Vec','Box'
  ]);

  function esc(s){
    return s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  }

  function highlightRust(src){
    let out = '';
    let i = 0; const n = src.length;
    function peek(k=0){ return src[i+k]; }
    function next(){ return src[i++]; }
    function isIdStart(ch){ return /[A-Za-z_]/.test(ch); }
    function isId(ch){ return /[A-Za-z0-9_]/.test(ch); }

    while (i < n){
      const ch = peek();

      // line comment
      if (ch === '/' && peek(1) === '/'){
        let j = i + 2; while (j < n && src[j] !== '\n') j++;
        out += `<span class="tok-cmt">${esc(src.slice(i, j))}</span>`;
        i = j; continue;
      }
      // block comment (non-nested)
      if (ch === '/' && peek(1) === '*'){
        let j = i + 2; while (j < n && !(src[j] === '*' && src[j+1] === '/')) j++;
        j = Math.min(n, j + 2);
        out += `<span class="tok-cmt">${esc(src.slice(i, j))}</span>`;
        i = j; continue;
      }
      // attribute #[...]
      if (ch === '#' && peek(1) === '['){
        let j = i + 2, depth = 1;
        while (j < n && depth > 0){
          if (src[j] === '[') depth++; else if (src[j] === ']') depth--; j++;
        }
        out += `<span class="tok-attr">${esc(src.slice(i, j))}</span>`;
        i = j; continue;
      }
      // string literal (simple, no raw-# support for brevity)
      if (ch === '"'){
        let j = i + 1; let escp = false;
        while (j < n){ const c = src[j++]; if (escp){ escp = false; continue; } if (c === '\\'){ escp = true; continue; } if (c === '"') break; }
        out += `<span class="tok-str">${esc(src.slice(i, j))}</span>`;
        i = j; continue;
      }
      // char literal or lifetime
      if (ch === '\''){
        // lifetime like 'a (letter then not closing quote soon)
        if (isId(peek(1)) && peek(2) !== '\''){
          out += `<span class="tok-life">${esc(src.slice(i, i+2))}</span>`; i += 2; continue;
        }
        let j = i + 1; let escp = false;
        while (j < n){ const c = src[j++]; if (escp){ escp = false; continue; } if (c === '\\'){ escp = true; continue; } if (c === '\'') break; }
        out += `<span class="tok-str">${esc(src.slice(i, j))}</span>`; i = j; continue;
      }
      // numbers (int/float, hex/bin/oct)
      if (/[0-9]/.test(ch)){
        let j = i;
        if (src[j] === '0' && /[xob]/i.test(src[j+1])){ j+=2; while (/[0-9a-fA-F_]/.test(src[j])) j++; }
        else {
          while (/[0-9_]/.test(src[j])) j++;
          if (src[j] === '.' && /[0-9]/.test(src[j+1])) { j++; while (/[0-9_]/.test(src[j])) j++; }
          if (/[eE]/.test(src[j])) { j++; if (/[+-]/.test(src[j])) j++; while (/[0-9_]/.test(src[j])) j++; }
        }
        // optional type suffix like u32, f64
        let k = j; while (/[A-Za-z0-9]/.test(src[k])) k++;
        out += `<span class="tok-num">${esc(src.slice(i, k))}</span>`; i = k; continue;
      }
      // identifiers, macros
      if (isIdStart(ch)){
        let j = i + 1; while (j < n && isId(src[j])) j++;
        const ident = src.slice(i, j);
        if (peek(j - i) === '!') { // macro
          out += `<span class="tok-macro">${esc(ident)}!</span>`; i = j + 1; continue;
        }
        if (KEYWORDS.has(ident)) { out += `<span class="tok-key">${ident}</span>`; i = j; continue; }
        if (PRIMITIVES.has(ident) || /[A-Z]/.test(ident[0])) { out += `<span class="tok-type">${esc(ident)}</span>`; i = j; continue; }
        out += esc(ident); i = j; continue;
      }

      // default single char
      out += esc(next());
    }
    return out;
  }

  function apply(){
    document.querySelectorAll('code.language-rust').forEach(code => {
      const raw = code.textContent; // keep original line breaks
      code.innerHTML = highlightRust(raw);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();

