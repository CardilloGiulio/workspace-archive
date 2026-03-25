using UnityEngine;

public class BackgroundFrameSwitcher : MonoBehaviour
{
    [Header("Frame Settings")]
    [Tooltip("Assign exactly three sprites in order: first, second, third.")]
    public Sprite[] frames = new Sprite[3];

    [Header("Timing Settings")]
    [Tooltip("Time in seconds between frame switches.")]
    public float switchInterval = 3f;

    [Header("Frame Transform")]
    [Tooltip("Set the local scale of the frame sprite.")]
    public Vector3 frameScale = Vector3.one;
    [Tooltip("Set the local position of the frame sprite relative to this GameObject.")]
    public Vector3 framePosition = Vector3.zero;

    private SpriteRenderer frameRenderer;
    private Transform frameTransform;
    private int currentFrame = 0;
    private float timer = 0f;

    void Awake()
    {
        // Validate frames
        if (frames == null || frames.Length < 3)
        {
            Debug.LogError("BackgroundFrameSwitcher requires exactly three frames to function.");
            enabled = false;
            return;
        }

        // Create or find child container for frame
        var child = transform.Find("FrameContainer");
        if (child == null)
        {
            child = new GameObject("FrameContainer").transform;
            child.SetParent(transform);
        }
        frameTransform = child;

        // Apply transform settings to the frame container
        frameTransform.localPosition = framePosition;
        frameTransform.localScale = frameScale;

        // Add or get a SpriteRenderer on the frame container
        frameRenderer = frameTransform.GetComponent<SpriteRenderer>();
        if (frameRenderer == null)
            frameRenderer = frameTransform.gameObject.AddComponent<SpriteRenderer>();

        // Initialize with the first frame
        frameRenderer.sprite = frames[0];
    }

    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= switchInterval)
        {
            timer = 0f;
            currentFrame = (currentFrame + 1) % frames.Length;
            frameRenderer.sprite = frames[currentFrame];
        }
    }
}
