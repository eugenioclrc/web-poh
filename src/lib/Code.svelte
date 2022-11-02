<script>
  export let source;

  import hljs from 'highlightjs';
  import hljsDefineSolidity from 'highlightjs-solidity';
  import 'highlightjs/styles/vs2015.css';
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

<div class="mockup-code text-sm max-w-4xl mx-auto mt-5" style="background-color: #191b1d;">
  <pre class="w-full flex justify-center">
    {#if code}
    <code class="hljs language-solidity !bg-transparent">
      {@html code}
    </code>
    {/if}
  </pre>
</div>
