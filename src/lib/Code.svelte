<script>
  export let source;

  import hljs from 'highlightjs';
  import hljsDefineSolidity from 'highlightjs-solidity';
  import 'highlightjs/styles/vs2015.css';
  import { onMount } from "svelte";
  import axios from 'axios';

  import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte'
  
  const REPLACE_FROM = 'https://github.com/Proof-Of-Hack-Protocol/challenges/blob/';
  const REPLACE_TO = 'https://raw.githubusercontent.com/Proof-Of-Hack-Protocol/challenges/';
  
  let sourcecode;
  let code;
  onMount(async () => {
    hljsDefineSolidity(hljs);
    hljs.initHighlightingOnLoad();
    sourcecode = (await axios.get(source.replace(REPLACE_FROM, REPLACE_TO))).data;
    code = hljs.highlightAuto(sourcecode).value
  });

  let copied = false;
  async function copy() {
    await navigator.clipboard.writeText(sourcecode);
    copied = true;
  }
</script>

<div class="mockup-code text-sm max-w-4xl mx-auto mt-5" style="background-color: #191b1d;">
  <button 
    class="
      btn btn-outline btn-ghost
      text-slate-50
      flex 
      flex-row 
      items-center 
      rounded py-2 px-4
      text-sm
      absolute 
      top-4
      right-4
    " on:click={copy}>
    <div class="w-6 h-6 mr-2">
      <MdContentCopy />
    </div>
    <span class="flex-1 text-center">{copied ? 'Copied' : 'Copy source code'}</span>
  </button>
  <pre class="w-full flex justify-center">
    {#if code}
    <code class="hljs language-solidity !bg-transparent">
      {@html code}
    </code>
    {/if}
  </pre>
</div>
