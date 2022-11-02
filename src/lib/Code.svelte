<script>
  export let source;

  import hljs from 'highlightjs';
  import hljsDefineSolidity from 'highlightjs-solidity';
  import 'highlight.js/styles/vs2015.css';
  import { onMount } from "svelte";
  import axios from 'axios';
  
  const REPLACE_FROM = 'https://github.com/Proof-Of-Hack-Protocol/challenges/blob/';
  const REPLACE_TO = 'https://raw.githubusercontent.com/Proof-Of-Hack-Protocol/challenges/';
  
  let code;
  onMount(async () => {
    hljsDefineSolidity(hljs);
    hljs.initHighlightingOnLoad();
    const { data: sourcecode } = await axios.get(source.replace(REPLACE_FROM, REPLACE_TO));
    code = hljs.highlightAuto(sourcecode).value
  });
</script>

<a href={source} target="_blank" rel="noreferrer">
  <pre class="w-full px-32 mx-auto">
    {#if code}
      <code class="hljs language-solidity rounded text-sm !px-5 !py-10">{@html code}</code>
    {/if}
  </pre>
</a>
