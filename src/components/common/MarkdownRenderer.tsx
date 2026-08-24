import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const parsedHtml = marked.parse(content || '') as string;

  useEffect(() => {
    if (!containerRef.current) return;

    // Attach copy buttons to pre/code blocks
    const preBlocks = containerRef.current.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      if (pre.querySelector('.copy-code-btn')) return;

      const codeEl = pre.querySelector('code');
      const codeText = codeEl ? codeEl.innerText : pre.innerText;

      // Container for header
      const header = document.createElement('div');
      header.className = 'flex items-center justify-between px-3.5 py-1.5 bg-[#131316] border-b border-white/10 text-[11px] font-mono text-txt-subtle select-none';
      
      const langSpan = document.createElement('span');
      langSpan.innerText = 'COMMAND / CODE';
      header.appendChild(langSpan);

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-txt-muted hover:text-white transition-colors text-[10px] font-mono';
      copyBtn.innerText = 'Salin';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(codeText);
        copyBtn.innerText = '✓ Disalin';
        setTimeout(() => {
          copyBtn.innerText = 'Salin';
        }, 2000);
      };
      header.appendChild(copyBtn);

      pre.style.position = 'relative';
      pre.style.padding = '0';
      pre.style.overflow = 'hidden';
      pre.style.borderRadius = '16px';
      pre.style.background = '#0A0A0C';
      pre.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      pre.style.margin = '1rem 0';

    // Wrap tables in responsive scroll containers
    if (containerRef.current) {
      const tables = containerRef.current.querySelectorAll('table');
      tables.forEach((table) => {
        if (table.parentElement?.classList.contains('table-responsive-container')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive-container overflow-x-auto my-4 rounded-xl border border-white/10 scrollbar-thin';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    }

    if (codeEl) {
      codeEl.style.display = 'block';
      codeEl.style.padding = '0.85rem 1rem';
      codeEl.style.overflowX = 'auto';
      codeEl.style.fontSize = '0.75rem';
      codeEl.style.lineHeight = '1.6';
      codeEl.style.color = '#E2E8F0';
      codeEl.style.fontFamily = '"JetBrains Mono", monospace';
    }

    pre.insertBefore(header, pre.firstChild);
  });
}, [parsedHtml]);

  return (
    <div
      ref={containerRef}
      className={`markdown-body space-y-4 text-txt-on-dark leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};
