using UnityEngine;

[RequireComponent(typeof(AudioSource))]
public class SpriteClickSound : MonoBehaviour
{
    // Assegna qui dal Inspector il clip da riprodurre
    public AudioClip clickClip;

    private AudioSource audioSource;

    void Awake()
    {
        // Prendi (o crea) il componente AudioSource
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
            audioSource = gameObject.AddComponent<AudioSource>();

        // Assicuriamoci che non si avvii in loop
        audioSource.loop = false;
    }

    // Questo metodo viene chiamato automaticamente quando clicchi (o tocchi) il collider del GameObject
    void OnMouseDown()
    {
        if (clickClip != null)
        {
            audioSource.PlayOneShot(clickClip);
        }
        else
        {
            Debug.LogWarning("Nessun clickClip assegnato a " + gameObject.name);
        }
    }
}
