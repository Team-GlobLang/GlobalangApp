import { computed, ref } from 'vue'
import toast from 'vue3-hot-toast'

export type PermissionState = 'unknown' | 'granted' | 'denied'

const permission = ref<PermissionState>('unknown')

export function useMicPermission(){
  async function request(){
    return toast.promise(
      (async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach(t => t.stop())
        permission.value = 'granted'
        return 'Permiso otorgado'
      })(),
      { loading: 'Solicitando permiso…', success: (m:string)=>m, error: (e:Error)=> e.message || 'Permiso denegado' }
    ).catch(() => { permission.value = 'denied'; throw new Error('Micrófono denegado') })
  }
  return {
    permission,
    hasPermission:  computed(()=> permission.value === 'granted'),
    request
  }
}
