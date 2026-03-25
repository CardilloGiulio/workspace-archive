using UnityEngine;

[RequireComponent(typeof(Collider))]
public class SpriteClickEnable : MonoBehaviour
{
    // Assegna qui dal Inspector l'AudioSource dell'oggetto target
    public AudioSource targetAudioSource;

    void Awake()
    {
        if (targetAudioSource == null)
        {
            Debug.LogWarning("Nessun targetAudioSource assegnato a " + gameObject.name);
        }
        else
        {
            // Assicuriamoci che sia disabilitato all'inizio
            targetAudioSource.enabled = false;
        }
    }

    // Quando clicchi (o tocchi) il collider del GameObject
    void OnMouseDown()
    {
        if (targetAudioSource != null)
        {
            // Abilita il componente AudioSource sull'oggetto target
            targetAudioSource.enabled = true;
        }
        else
        {
            Debug.LogWarning("Non posso abilitare nulla: targetAudioSource non assegnato in " + gameObject.name);
        }
    }
}
